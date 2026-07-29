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
import { findGitignoreFile } from "../utils/gitignore"
import ignore from "ignore"

export async function runAction(target: string, options: any) {
  const asciiText = `
██████╗  █████╗  ██████╗██╗  ██╗   ███╗   ███╗██████╗ 
██╔══██╗██╔══██╗██╔════╝██║ ██╔╝   ████╗ ████║██╔══██╗
██████╔╝███████║██║     █████╔╝    ██╔████╔██║██║  ██║
██╔═══╝ ██╔══██║██║     ██╔═██╗    ██║╚██╔╝██║██║  ██║
██║     ██║  ██║╚██████╗██║  ██╗██╗██║ ╚═╝ ██║██████╔╝
╚═╝     ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝     ╚═╝╚═════╝ 
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

    spinner.stop()

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

      // --- 🔒 .gitignore handling ---
      const outputAbsolutePath = path.resolve(process.cwd(), finalPath)
      const gitignoreInfo = await findGitignoreFile(process.cwd())

      if (gitignoreInfo) {
        const ig = ignore().add(gitignoreInfo.content)
        const gitignoreDir = path.dirname(gitignoreInfo.path)
        const relativeToGitignore = path.relative(
          gitignoreDir,
          outputAbsolutePath
        )

        // Check if the file is already ignored (using glob matching)
        if (!ig.ignores(relativeToGitignore)) {
          const { addToGitignore } = await inquirer.prompt([
            {
              type: "confirm",
              name: "addToGitignore",
              message: `Would you like to add ${color.cyan(finalPath)} to ${color.dim(path.relative(process.cwd(), gitignoreInfo.path) || ".gitignore")}?`,
              default: true,
            },
          ])

          if (addToGitignore) {
            // Ensure the file ends with a newline before appending
            const content = gitignoreInfo.content
            const prefix = content.endsWith("\n") || content === "" ? "" : "\n"
            await fs.appendFile(
              gitignoreInfo.path,
              `${prefix}${relativeToGitignore}\n`,
              "utf-8"
            )
            console.log(
              color.green("✔ ") +
                color.cyan(finalPath) +
                color.white(" is now safely hidden in ") +
                color.dim(
                  path.relative(process.cwd(), gitignoreInfo.path) ||
                    ".gitignore"
                ) +
                color.white(" 🔒")
            )
          }
        } else {
          // Already ignored – no prompt needed
          spinner.info(
            color.dim(
              `${color.bold(finalPath)} is already ignored by .gitignore.`
            )
          )
        }
      } else {
        // No .gitignore found – offer to create one in the current directory
        const { createGitignore } = await inquirer.prompt([
          {
            type: "confirm",
            name: "createGitignore",
            message: `No .gitignore found. Would you like to create one and add ${color.cyan(finalPath)}?`,
            default: true,
          },
        ])

        if (createGitignore) {
          const gitignorePath = path.join(process.cwd(), ".gitignore")
          await fs.writeFile(gitignorePath, `${finalPath}\n`, "utf-8")
          console.log(
            color.green("✔ ") +
              color.cyan(finalPath) +
              color.white(" added to newly created .gitignore 🔒")
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
