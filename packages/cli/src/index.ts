#!/usr/bin/env node
import { Command } from "commander";
import { version } from "../package.json";
import { runActionCommand } from "./action";

const program = new Command();

program
  .name("git2txt")
  .description(
    "Convert any GitHub repository or local directory into LLM‑ready text",
  )
  .version(version, "-v, --version", "output the version number")
  .argument(
    "[repo]",
    "GitHub URL, owner/repo, or local path (default: current directory)",
  )
  .option("-r, --repo <repo>", "Alias for repo argument")
  .option(
    "-o, --output <file>",
    "Write single combined digest file instead of folder",
  )
  .option(
    "--dir <name>",
    "Output directory name when using folder mode",
    "git2txt",
  )
  .option("--max-file-size <kb>", "Max file size in KB", "100")
  .option("--max-files <n>", "Max number of files to include", "200")
  .option("--include <globs...>", "Include only matching files (glob patterns)")
  .option("--exclude <globs...>", "Exclude matching files (glob patterns)")
  .option("-t, --token <token>", "GitHub personal access token")
  .action(
    async (repoArg: string | undefined, options: any) =>
      await runActionCommand(repoArg, options),
  );

program.parse();
