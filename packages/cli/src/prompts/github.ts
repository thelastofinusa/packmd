import inquirer from "inquirer"

export async function promptGithubOptions(currentOptions: any) {
  // 1. Ask if they want to configure options
  const { customize } = await inquirer.prompt([
    {
      type: "confirm",
      name: "customize",
      message: "GitHub URL detected. Would you like to configure options?",
      default: false,
    },
  ])

  // If no, proceed with default options passed via CLI flags
  if (!customize) return currentOptions

  // 2. Prompt for specific configurations with defaults filled in
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "maxFiles",
      message: "Maximum number of files to include:",
      default: currentOptions.maxFiles || "200",
      validate: (val) => !isNaN(Number(val)) || "Please enter a valid number",
    },
    {
      type: "input",
      name: "maxFileSize",
      message: "Maximum file size threshold (in KB):",
      default: currentOptions.maxFileSize || "100",
      validate: (val) => !isNaN(Number(val)) || "Please enter a valid number",
    },
    {
      type: "password",
      name: "token",
      message: "GitHub Token (Optional - for private or larger repos):",
      default: currentOptions.token || "",
    },
  ])

  // Merge the answers back into the options object
  return { ...currentOptions, ...answers }
}
