import "@/styles/globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ScoreEzy - Learning Platform",
  description: "Empower your learning journey with personalized education",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
          <aside className="w-64 bg-white shadow-md">
            <nav className="mt-5">
              <Link href="/" className="block px-4 py-2 text-sm hover:bg-gray-200">
                Home
              </Link>
              <Link href="/student" className="block px-4 py-2 text-sm hover:bg-gray-200">
                Student Dashboard
              </Link>
              <Link href="/instructor" className="block px-4 py-2 text-sm hover:bg-gray-200">
                Instructor Dashboard
              </Link>
              <Link href="/parent" className="block px-4 py-2 text-sm hover:bg-gray-200">
                Parent Dashboard
              </Link>
              <Link href="/parent/progress-tracking" className="block px-4 py-2 text-sm hover:bg-gray-200">
                Progress Tracking
              </Link>
              <Link href="/parent/custom-alerts" className="block px-4 py-2 text-sm hover:bg-gray-200">
                Custom Alerts
              </Link>
              <Link href="/parent/parent-teacher-communication" className="block px-4 py-2 text-sm hover:bg-gray-200">
                Communication
              </Link>
              <Link href="/parent/learning-goals" className="block px-4 py-2 text-sm hover:bg-gray-200">
                Learning Goals
              </Link>
              <Link href="/parent/family-learning-hub" className="block px-4 py-2 text-sm hover:bg-gray-200">
                Family Learning Hub
              </Link>
            </nav>
          </aside>
          <main className="flex-1 p-10 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  )
}



import './globals.css'