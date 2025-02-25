import { NextResponse } from "next/server"
import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

export async function POST(req: Request) {
  const { code, language } = await req.json()

  if (!code || !language) {
    return NextResponse.json({ error: "Code and language are required" }, { status: 400 })
  }

  let result
  try {
    switch (language) {
      case "javascript":
        result = await execAsync(`node -e "${code.replace(/"/g, '\\"')}"`)
        break
      case "python":
        result = await execAsync(`python -c "${code.replace(/"/g, '\\"')}"`)
        break
      default:
        return NextResponse.json({ error: "Unsupported language" }, { status: 400 })
    }

    return NextResponse.json({ output: result.stdout, error: result.stderr })
  } catch (error) {
    console.error("Execution error:", error)
    return NextResponse.json({ error: "Execution failed" }, { status: 500 })
  }
}

