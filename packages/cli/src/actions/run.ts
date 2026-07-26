import color from "picocolors"
import clipboard from "clipboardy"
import fs from "node:fs/promises"
import path from "node:path"
import inquirer from "inquirer"
import ora from "ora"
import { name, version } from "../../package.json"
import { checkForUpdate, printUpdateNotice } from "../utils/version-check"
import { handleGitHub, handleLocalDir, handleWebpage } from "../handlers"
import { promptGithubOptions } from "../prompts/github"

export async function runAction(target: string, options: any) {
  const asciiText = `
██████╗  █████╗  ██████╗██╗  ██╗███╗   ███╗██████╗ 
██╔══██╗██╔══██╗██╔════╝██║ ██╔╝████╗ ████║██╔══██╗
██████╔╝███████║██║     █████╔╝ ██╔████╔██║██║  ██║
██╔═══╝ ██╔══██║██║     ██╔═██╗ ██║╚██╔╝██║██║  ██║
██║     ██║  ██║╚██████╗██║  ██╗██║ ╚═╝ ██║██████╔╝
╚═╝     ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═════╝ 
`

  console.log(color.cyanBright(asciiText))
  console.log(color.dim(` ${name} v${version} — AI Markdown Packager\n`))

  const updateCheck = checkForUpdate(version).catch(() => null)
  let finalOptions = { ...options }

  try {
    let digest = ""
    const spinner = ora()

    if (target.startsWith("http://") || target.startsWith("https://")) {
      const targetUrl = new URL(target)
      const isGitHub = targetUrl.hostname.includes("github.com")

      if (isGitHub) {
        // Trigger the smart inquirer prompt
        finalOptions = await promptGithubOptions(finalOptions)
        spinner.start("Fetching repository. Please wait..")
        digest = await handleGitHub(target, finalOptions, spinner)
      } else {
        spinner.start("Scraping webpage. Please wait..")
        digest = await handleWebpage(target, finalOptions)
      }
    } else {
      spinner.start("Scanning local directory. Please wait..")
      digest = await handleLocalDir(target, finalOptions, spinner)
    }

    // Output Handling
    let outputPath = finalOptions.copy ? null : finalOptions.output || "pack.md"

    if (outputPath) {
      let finalPath = outputPath

      // Loop to ensure we get a valid, safe path if the user declines overwriting
      while (true) {
        let fileExists = false
        try {
          await fs.access(finalPath)
          fileExists = true
        } catch {
          // File does not exist, which is what we want
          fileExists = false
        }

        if (fileExists) {
          const { overwrite } = await inquirer.prompt([
            {
              type: "confirm",
              name: "overwrite",
              message: `File ${color.cyan(finalPath)} already exists. Overwrite?`,
              default: false,
            },
          ])

          if (overwrite) {
            break // User confirmed overwrite, exit loop
          } else {
            const { newFileName } = await inquirer.prompt([
              {
                type: "input",
                name: "newFileName",
                message: "Please enter a new file name:",
                default: "pack-new.md",
                validate: (val) =>
                  val.trim().length > 0 || "File name cannot be empty.",
              },
            ])
            finalPath = newFileName // Update path and check again on the next iteration
          }
        } else {
          break // File doesn't exist, safe to write
        }
      }

      // Write the file
      await fs.writeFile(finalPath, digest, { encoding: "utf-8", flag: "w" })
      spinner.succeed("Markdown generated successfully!")

      // --- 🔒 .gitignore handling ---
      const gitignorePath = path.join(process.cwd(), ".gitignore")
      let gitignoreContent = ""

      try {
        // Attempt to read .gitignore if it exists
        gitignoreContent = await fs.readFile(gitignorePath, "utf-8")
      } catch {
        // File doesn't exist yet; fs.appendFile will auto-create it later if confirmed
      }

      const isIgnored = gitignoreContent
        .split("\n")
        .map((line) => line.trim())
        .includes(finalPath)

      if (!isIgnored) {
        const { addToGitignore } = await inquirer.prompt([
          {
            type: "confirm",
            name: "addToGitignore",
            message: `Would you like to add ${color.cyan(finalPath)} to your .gitignore?`,
            default: true,
          },
        ])

        if (addToGitignore) {
          const prefix =
            gitignoreContent.endsWith("\n") || gitignoreContent === ""
              ? ""
              : "\n"

          // Creates .gitignore if missing, or appends to existing
          await fs.appendFile(gitignorePath, `${prefix}${finalPath}\n`, "utf-8")
          console.log(
            color.green("✔ ") +
              color.cyan(finalPath) +
              color.white(" is now safely hidden in .gitignore 🔒")
          )
        }
      }
    }

    if (finalOptions.copy) {
      await clipboard.write(digest)
      spinner.succeed("Markdown compiled successfully.")
    }

    const latestVersion = await updateCheck
    if (latestVersion) printUpdateNotice(version, latestVersion)
  } catch (error: any) {
    console.error(
      color.red(`\n✖ ${error.message || "An unexpected error occurred"}`)
    )
    process.exit(1)
  }
}
