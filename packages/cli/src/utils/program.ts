interface CliOption {
  flags: string
  description: string
  defaultValue?: string | boolean
}

export const cliOptions: CliOption[] = [
  {
    flags: "-o, --output <path>",
    description:
      "Specify a custom file path to save the generated Markdown digest",
  },
  {
    flags: "-t, --token <token>",
    description:
      "Provide a GitHub Personal Access Token for private repositories or extended rate limits",
  },
  {
    flags: "-m, --max-files <number>",
    description:
      "Limit the total number of files to include in the final digest",
    defaultValue: "200",
  },
  {
    flags: "-s, --max-file-size <number>",
    description: "Set the maximum allowed size (in KB) for individual files",
    defaultValue: "100",
  },
  {
    flags: "-i, --include <patterns...>",
    description:
      "Specify glob patterns to explicitly include certain files or directories",
  },
  {
    flags: "-e, --exclude <patterns...>",
    description:
      "Specify glob patterns to explicitly ignore certain files or directories",
  },
  {
    flags: "-c, --copy",
    description:
      "Automatically copy the generated Markdown digest to your clipboard",
    defaultValue: false,
  },
  {
    flags: "--jina-api-key <key>",
    description:
      "Provide a Jina API key for enhanced webpage scraping and parsing",
  },
  {
    flags: "--no-gitignore",
    description:
      "Don't respect .gitignore rules when scanning a local directory",
  },
]
