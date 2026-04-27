# @git2txt/core

Shared core logic for the **git2txt** web app and CLI.

Contains:

- GitHub API fetching (`fetchDigest`, `GitHubError`)
- Digest formatting (`buildDigest`, `estimateTokens`)
- Directory tree building (`buildTreeStructure`, `renderTree`)
- Glob matching (`matchesAny`)
- URL parsing (`parseRepoUrl`)
- Shared TypeScript types and defaults.

Used by:

- [**@git2txt/web**](https://git2txt.vercel.app) (Official website for git2txt)
- [**@git2txt/cli**](#) (Node.js CLI tool)
