import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useSession } from "next-auth/react"

interface AuthContextType {
  user: any
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUser(session.user)
    } else {
      setUser(null)
    }
    setLoading(false)
  }, [session, status])

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

