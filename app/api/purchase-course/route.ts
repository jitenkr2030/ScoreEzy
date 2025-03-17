import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/auth.config"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { courseId } = await req.json()

  try {
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: session.user?.id as string,
        courseId,
      },
    })

    return NextResponse.json({ success: true, enrollment })
  } catch (error) {
    console.error("Error purchasing course:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

