import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

export function Navigation() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const closeMenu = () => setIsMenuOpen(false)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeMenu()
    }
  }

  return (
    <nav className="bg-gray-800 text-white" onKeyDown={handleKeyDown}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0" aria-label="Home">
              ScoreEzy
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/courses"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  router.pathname === "/courses" ? "bg-gray-900" : "hover:bg-gray-700"
                }`}
                aria-current={router.pathname === "/courses" ? "page" : undefined}
              >
                Courses
              </Link>
              {/* Add more navigation items here */}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Add hamburger icon here */}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/courses"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              router.pathname === "/courses" ? "bg-gray-900" : "hover:bg-gray-700"
            }`}
            aria-current={router.pathname === "/courses" ? "page" : undefined}
          >
            Courses
          </Link>
          {/* Add more mobile navigation items here */}
        </div>
      </div>
    </nav>
  )
}

