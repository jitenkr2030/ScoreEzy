import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import prisma from "@/lib/prisma"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const subscriptions = await prisma.subscription.findMany()
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email as string },
      include: { subscription: true },
    })

    return NextResponse.json({
      subscriptions,
      currentSubscription: user?.subscription?.id || null,
    })
  } catch (error) {
    console.error("Error fetching subscriptions:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

