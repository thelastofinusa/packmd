"use client"

import { usePreference } from "../hooks/use-preference"
import { ChoiceSelect } from "./choice-select"
import { CopyButton } from "./copy-button"

const MANAGERS = [
  { id: "bun", label: "bun", install: "bun add -g", run: "bunx --bun" },
  { id: "npm", label: "npm", install: "npm install -g", run: "npx" },
  { id: "pnpm", label: "pnpm", install: "pnpm install -g", run: "pnpm dlx" },
  { id: "yarn", label: "yarn", install: "yarn add -g", run: "yarn dlx" },
] as const

const INSTALLATIONS = [
  { id: "global", label: "Global Install" },
  { id: "one-time", label: "One-Time Run" },
] as const

export const MANAGER_IDS = MANAGERS.map((manager) => manager.id)
export const INSTALLATION_IDS = INSTALLATIONS.map((framework) => framework.id)

export function buildInstallCommand(
  managerId: string,
  item: string,
  installationId: string
) {
  const manager = MANAGERS.find((m) => m.id === managerId) ?? MANAGERS[0]

  return installationId === "global"
    ? `${manager.install} ${item}`
    : `${manager.run} ${item} <github_or_webpage_url>`
}

export function InstallTabs({ item }: { item: string }) {
  const [managerId, setManagerId] = usePreference("pm", "bun", MANAGER_IDS)
  const [installationId, setInstallationId] = usePreference(
    "installation",
    "global",
    INSTALLATION_IDS
  )

  const manager = MANAGERS.find((m) => m.id === managerId) ?? MANAGERS[0]
  const fullCommand = buildInstallCommand(manager.id, item, installationId)

  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="flex items-center justify-between border-b bg-card px-2">
        <ChoiceSelect
          label="Package manager"
          options={MANAGERS}
          value={manager.id}
          onValueChange={setManagerId}
        />
        <ChoiceSelect
          label="Installation"
          options={INSTALLATIONS}
          value={installationId}
          onValueChange={setInstallationId}
          align="end"
        />
      </div>
      <div className="flex items-center justify-between gap-3 py-1.5 pr-1.5 pl-4">
        <code className="overflow-x-auto text-[13px] whitespace-nowrap text-foreground/90">
          {fullCommand}
        </code>
        <CopyButton text={fullCommand} />
      </div>
    </div>
  )
}
