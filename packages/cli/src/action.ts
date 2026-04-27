import ora from "ora";
import {
  fetchDigest,
  parseRepoUrl,
  buildExportHeader,
  type DigestOptions,
} from "@git2txt/core";
import { fetchLocalDigest } from "@git2txt/core/local";
import chalk from "chalk";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { resolveSource } from "./helpers";

export async function runActionCommand(
  repoArg: string | undefined,
  options: any,
) {
  const { source, isLocal } = resolveSource(repoArg || options.repo);

  const digestOptions: DigestOptions = {
    maxFileSizeKB: Number(options.maxFileSize),
    maxFiles: Number(options.maxFiles),
    includeGlobs: options.include || [],
    excludeGlobs: options.exclude || [],
    token: options.token,
  };

  const spinner = ora({
    text: isLocal ? "Scanning directory..." : "Preparing...",
    color: "cyan",
    stream: process.stderr,
  }).start();

  try {
    let result;
    if (isLocal) {
      console.error(chalk.blue(`Digesting local directory: ${source}`));
      result = await fetchLocalDigest(source, digestOptions, (msg) => {
        spinner.text = msg;
      });
    } else {
      const parsed = parseRepoUrl(source);
      if (!parsed) {
        spinner.fail(
          chalk.red(
            "Could not parse a valid GitHub repository from that input.",
          ),
        );
        process.exit(1);
      }
      console.error(
        chalk.blue(
          `Fetching GitHub repository: ${parsed.owner}/${parsed.repo}`,
        ),
      );
      result = await fetchDigest(
        parsed.owner,
        parsed.repo,
        digestOptions,
        (msg) => {
          spinner.text = msg;
        },
      );
    }

    spinner.succeed(chalk.green("Digest generated"));

    const repoUrl = isLocal
      ? undefined
      : `https://github.com/${result.owner}/${result.repo}`;
    const header = buildExportHeader(result, repoUrl);

    if (options.output) {
      const output = header + "\n\n" + result.digest;
      writeFileSync(options.output, output, "utf-8");
      console.error(chalk.green(`Digest written to ${options.output}`));
      return;
    }

    const folderName = options.dir || "git2txt";
    mkdirSync(folderName, { recursive: true });

    const parts = result.digest.split("## Directory Structure");
    const summaryPart = parts[0];
    const rest = parts[1]?.split("## Files Content") || [];
    const structurePart = rest[0] || "";

    writeFileSync(
      join(folderName, "summary.txt"),
      header + "\n\n" + summaryPart.trimEnd(),
      "utf-8",
    );
    writeFileSync(
      join(folderName, "structure.txt"),
      header + "\n\n" + "## Directory Structure" + structurePart.trimEnd(),
      "utf-8",
    );
    writeFileSync(
      join(folderName, "content.txt"),
      header + "\n\n" + result.digest,
      "utf-8",
    );

    console.error(chalk.green(`Digest saved to folder ./${folderName}/`));
    console.error("  - summary.txt");
    console.error("  - structure.txt");
    console.error("  - content.txt (complete digest)");
  } catch (error: any) {
    console.error(chalk.red("Error:"), error.message);
    process.exit(1);
  }
}
