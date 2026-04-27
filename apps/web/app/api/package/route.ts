import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function GET() {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_PACKAGE_URL as string)
    if (!res.ok) throw new Error("Package not found")
    const data = await res.json()
    return NextResponse.json({
      name: data.name,
      version: data.version,
      description: data.description,
      links: {
        npm: `https://www.npmjs.com/package/${data.name}`,
        repository: data.repository?.url
          ?.replace("git+", "")
          .replace(".git", ""),
      },
    })
  } catch {
    return NextResponse.json(
      { error: "Could not fetch package info" },
      { status: 500 }
    )
  }
}
