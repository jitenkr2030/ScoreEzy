import { useSession } from "next-auth/react"
import { hasRequiredRole } from "@/lib/auth"
import type React from "react" // Added import for React

interface RoleBasedAccessProps {
  requiredRoles: string[]
  children: React.ReactNode
}

export function RoleBasedAccess({ requiredRoles, children }: RoleBasedAccessProps) {
  const { data: session } = useSession()

  if (!session || !hasRequiredRole(session, requiredRoles)) {
    return null
  }

  return <>{children}</>
}

