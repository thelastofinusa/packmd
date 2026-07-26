#!/usr/bin/env node
import { Command } from "commander"
import { runAction } from "./actions/run"
import { name, description, version } from "../package.json"
import { cliOptions } from "./utils/program"

const program = new Command()

program
  .name(name)
  .description(description)
  .version(version, "-v, --version", "Output the version number")
  .argument(
    "[target]",
    "GitHub URL, Webpage URL, or local directory path (defaults to current directory)",
    "."
  )

cliOptions.forEach(({ flags, description, defaultValue }) => {
  if (defaultValue !== undefined) {
    program.option(flags, description, defaultValue)
  } else {
    program.option(flags, description)
  }
})

program.action(runAction)

program.parse()
