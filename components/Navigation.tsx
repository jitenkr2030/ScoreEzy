"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { NotificationBell } from "./NotificationBell"

export function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeMenu()
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg" onKeyDown={handleKeyDown}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 text-2xl font-bold tracking-tight hover:text-blue-200 transition-colors" aria-label="Home">
              ScoreEzy
            </Link>
            <div className="ml-4">
              <NotificationBell />
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/courses"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${pathname === "/courses" ? "bg-white/10 text-white" : "text-gray-100 hover:bg-white/10"}`}
                aria-current={pathname === "/courses" ? "page" : undefined}
              >
                Courses
              </Link>
              <Link
                href="/dashboard"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${pathname === "/dashboard" ? "bg-white/10 text-white" : "text-gray-100 hover:bg-white/10"}`}
                aria-current={pathname === "/dashboard" ? "page" : undefined}
              >
                Dashboard
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-100 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden fixed inset-0 z-50 bg-gray-900 bg-opacity-50`} id="mobile-menu">
        <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
          <div className="flex justify-end p-4 border-b">
            <button onClick={closeMenu} className="text-gray-500 hover:text-gray-700">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/courses"
              className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === "/courses" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
              onClick={closeMenu}
            >
              Courses
            </Link>
            <Link
              href="/dashboard"
              className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === "/dashboard" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
              onClick={closeMenu}
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

