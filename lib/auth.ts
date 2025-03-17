import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { compare } from "bcrypt"
import prisma from "./prisma"

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    }
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })
        if (!user || !user.name) {
          return null
        }
        const isPasswordValid = await compare(credentials.password, user.password)
        if (!isPasswordValid) {
          return null
        }
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as string
      }
      return session
    },
  },
}

export function hasRequiredRole(session: any, requiredRoles: string[]) {
  return session?.user?.role && requiredRoles.includes(session.user.role)
}

type RolePermissions = {
  [key: string]: string[];
};

export function hasPermission(session: any, permission: string) {
  const rolePermissions: RolePermissions = {
    admin: ['all'],
    instructor: ['create_course', 'edit_course', 'view_students', 'grade_assignments'],
    student: ['view_course', 'submit_assignment', 'view_grades'],
    parent: ['view_progress', 'view_grades', 'contact_instructor']
  }
  const userRole = session?.user?.role
  return userRole && (
    rolePermissions[userRole]?.includes('all') ||
    rolePermissions[userRole]?.includes(permission)
  )
}

export function getDefaultRedirectPath(role: string) {
  const paths: { [key: string]: string } = {
    admin: '/admin',
    instructor: '/instructor',
    student: '/student',
    parent: '/parent'
  }
  return paths[role] || '/'
}

