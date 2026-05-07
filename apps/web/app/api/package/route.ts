import { NextResponse } from "next/server"

export const runtime = "nodejs"

const packageSource =
  process.env.NEXT_PUBLIC_PACKAGE_URL ?? process.env.PACKAGE_NAME

type NpmPackageResponse = {
  name: string
  description?: string
  repository?: {
    url?: string
  }
  "dist-tags"?: {
    latest?: string
  }
  version?: string
}

function getPackageName(source: string) {
  try {
    const url = new URL(source)
    const packagePath = url.pathname
      .replace(/^\/package\//, "")
      .replace(/^\//, "")

    return decodeURIComponent(packagePath.replace(/\/$/, ""))
  } catch {
    return source
  }
}

export async function GET() {
  try {
    const packageName = getPackageName(packageSource as string)
    const registryPackageName = encodeURIComponent(packageName).replace(
      "%40",
      "@"
    )
    const res = await fetch(
      `https://registry.npmjs.org/${registryPackageName}`,
      { next: { revalidate: 3600 } }
    )

    if (res.status === 404) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 })
    }

    if (!res.ok) throw new Error("Could not fetch package info")

    const data = (await res.json()) as NpmPackageResponse
    const version = data["dist-tags"]?.latest ?? data.version

    return NextResponse.json({
      name: data.name,
      version,
      description: data.description,
      links: {
        npm: `https://www.npmjs.com/package/${data.name}`,
        repository: data.repository?.url
          ?.replace("git+", "")
          .replace(".git", ""),
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Could not fetch package info",
      },
      { status: 500 }
    )
  }
}
