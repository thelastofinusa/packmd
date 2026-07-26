export const SOCIALS = [
  {
    platform: "𝕏",
    name: "Holiday",
    username: "@thelastofinusa",
    url: "https://x.com/thelastofinusa",
  },
  {
    platform: "GitHub",
    name: "PackMD",
    username: "@thelastofinusa",
    url: "https://github.com/thelastofinusa/packmd",
  },
]

export const defaultMarkdown = () => {
  return `# shadcn/ui monorepo template

This is a Next.js monorepo template with shadcn/ui.

## Adding components

To add components to your app, run the following command at the root of your \`web\` app:

\`\`\`bash
bunx shadcn@latest add button -c packages/ui
\`\`\`

This will place the ui components in the \`packages/ui/src/components\` directory.

## Using components

To use the components in your app, import them from the \`ui\` package.

\`\`\`tsx
import { Button } from "@packmd/ui/components/button";
\`\`\`
`
}
