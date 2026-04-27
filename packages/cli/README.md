# git2txt CLI

Command‑line tool to convert **any GitHub repository** or **local directory** into a structured LLM‑ready text digest.

## Quick Start

```bash
npx @git2txt/cli facebook/react
```

## Installation

```bash
npm install -g @git2txt/cli
git2txt facebook/react
```

## Usage

```
git2txt [repo] [options]
```

- **Without argument** – digests the current working directory.
- **With a GitHub URL or `owner/repo`** – fetches that repository.
- **With a local path** – digests the specified directory.

### Options

| Option                 | Description                                      |
| ---------------------- | ------------------------------------------------ |
| `-h, --help`           | Show help message                                |
| `-o, --output <file>`  | Write a single combined file instead of a folder |
| `--dir <name>`         | Name of the output folder (default: `git2txt`)   |
| `--max-file-size <kb>` | Max file size in KB (default: 100)               |
| `--max-files <n>`      | Max number of files to include (default: 200)    |
| `--include <globs...>` | Only include files matching these globs          |
| `--exclude <globs...>` | Exclude files matching these globs               |
| `-t, --token <token>`  | GitHub personal access token for private repos   |

### Examples

```bash
# Digest current directory
git2txt

# Digest a GitHub repo into a folder
git2txt facebook/react

# Digest a local folder
git2txt ~/projects/my-app

# Save as a single file
git2txt vercel/next.js -o next.txt

# Limit file size and use custom folder name
git2txt . --max-file-size 50 --dir code-prompt

# Include only TypeScript and Markdown files
git2txt some/repo --include "*.ts" "*.md"
```

## Output

By default the CLI creates a folder (`git2txt` by default) containing:

- `summary.txt` – repository summary + header
- `structure.txt` – directory tree
- `content.txt` – the complete digest with all file contents and the professional header
