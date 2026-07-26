![PackMD Opengraph Image](https://packmd.vercel.app/og.png)

## packmd

**PackMD** is a command‑line tool that converts any GitHub repository, local directory, or web page into a clean, token‑efficient Markdown digest – ready to paste into ChatGPT, Claude, or any LLM.

### Installation

**Global (recommended)**

```bash
npm install -g packmd
```

Now you can use `packmd` from anywhere:

```bash
packmd --help
```

**Run without installing (using npx)**

```bash
npx packmd <target> [options]
```

**From source (monorepo)**

```bash
git clone https://github.com/thelastofinusa/packmd.git
cd packmd
bun install
cd packages/cli
bun run build
# run locally
node dist/index.js <target> [options]
```

### Quick Start

```bash
# Generate a digest from a public GitHub repo
packmd https://github.com/vercel/next.js -o next.md

# Scrape a documentation website (requires Jina API key for higher limits)
packmd https://react.dev --jina-api-key YOUR_KEY --copy

# Digest the current directory (respects .gitignore)
packmd .

# Digest a local folder with custom options
packmd ~/projects/my-app -m 300 -s 50 --exclude "*.test.js"
```

### Usage

```
packmd [target] [options]
```

| Argument | Description                                                                                                                                         |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `target` | GitHub URL (e.g., `https://github.com/owner/repo`), owner/repo slug, local directory path, or any webpage URL. Defaults to current directory (`.`). |

**Options**

| Flag                          | Description                                                                                |
| ----------------------------- | ------------------------------------------------------------------------------------------ |
| `-o, --output <path>`         | Save the generated Markdown to a specific file (e.g., `digest.md`).                        |
| `-c, --copy`                  | Copy the output directly to your clipboard (no file saved).                                |
| `-t, --token <token>`         | GitHub Personal Access Token for private repositories or higher rate limits.               |
| `-m, --max-files <number>`    | Maximum number of files to include (default: `200`).                                       |
| `-s, --max-file-size <kb>`    | Maximum file size in KB (files larger are skipped) (default: `100`).                       |
| `-i, --include <patterns...>` | Glob patterns to explicitly include (e.g., `"*.ts" "*.md"`).                               |
| `-e, --exclude <patterns...>` | Glob patterns to explicitly ignore (e.g., `"test/**" "*.log"`).                            |
| `--jina-api-key <key>`        | Jina Reader API key – raises the free rate limit from 20 to 500 requests per minute.       |
| `--no-gitignore`              | Ignore `.gitignore` rules when scanning a local directory (by default they are respected). |
| `-v, --version`               | Show the version number.                                                                   |
| `-h, --help`                  | Show help.                                                                                 |

> **Note:** When using `--output`, if the file already exists, you will be prompted to overwrite or enter a new name.

### Examples

**GitHub repository**

```bash
# Basic
packmd facebook/react -o react.md

# With token (for private repos)
packmd my-org/private-repo -t ghp_xxxxx -o private.md

# Limit to 300 files, exclude everything in the "examples" folder
packmd vercel/next.js -m 300 -e "examples/**" -o next-limited.md
```

**Web page (via Jina Reader)**

```bash
# Simple scrape
packmd https://docs.nestjs.com --copy

# With Jina API key (higher rate limit)
packmd https://tailwindcss.com/docs --jina-api-key jina_xxxxx -o tailwind.md
```

**Local directory**

```bash
# Digest the current folder
packmd .

# Digest a specific path
packmd ~/code/my-project -o project.md

# Override .gitignore and include only TypeScript files
packmd ./src --no-gitignore -i "*.ts" "*.tsx"
```

**Combine options**

```bash
packmd https://github.com/expressjs/express -o express.md -m 100 -s 50 -e "test/**" "*.spec.js"
```

### How It Works

The CLI uses the same core engine (`@packmd/core`) as the web app:

1. **Input detection** – determines if the target is a GitHub repo, a web page, or a local path.
2. **Fetching** – for GitHub, uses the GitHub API; for web pages, uses Jina Reader; for local, uses Node.js `fs`.
3. **Filtering** – applies ignore rules, globs, size limits, and binary detection.
4. **Processing** – builds a directory tree and downloads file contents (in parallel for GitHub).
5. **Markdown generation** – creates a header with metadata, an ASCII tree, and fenced code blocks for each file.

Progress is shown via a live spinner (`ora`). Output can be saved to a file or copied to your clipboard.

### Notes

- **GitHub rate limits** – Without a token, you are limited to 60 requests per hour. Use `-t` to raise this to 5,000 per hour.
- **Jina rate limits** – Without an API key, you get 20 requests per minute. Provide `--jina-api-key` for 500 RPM.
- The CLI respects `.gitignore` by default. Use `--no-gitignore` to scan everything.
- **Binary files** (images, fonts, archives) are automatically skipped.

---

### License

MIT © [Holiday](https://github.com/thelastofinusa)
