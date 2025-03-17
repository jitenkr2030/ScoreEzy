import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/auth.config"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { subscriptionId } = await req.json()

  try {
    const updatedUser = await prisma.user.update({
      where: { email: session.user?.email as string },
      data: { subscriptionId },
    })

    return NextResponse.json({ success: true, user: updatedUser })
  } catch (error) {
    console.error("Error updating subscription:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

