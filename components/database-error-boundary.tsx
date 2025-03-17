"use client"

import { useEffect, useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface DatabaseErrorBoundaryProps {
  children: React.ReactNode
}

export function DatabaseErrorBoundary({ children }: DatabaseErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const handleError = (error: Error) => {
      if (error.message.includes('database') || error.message.includes('prisma')) {
        setHasError(true)
        setError(error)
      }
    }

    window.addEventListener('error', (event) => handleError(event.error))
    window.addEventListener('unhandledrejection', (event) => handleError(event.reason))

    return () => {
      window.removeEventListener('error', (event) => handleError(event.error))
      window.removeEventListener('unhandledrejection', (event) => handleError(event.reason))
    }
  }, [])

  if (hasError) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertTitle>Database Connection Error</AlertTitle>
        <AlertDescription className="mt-2">
          <p>We're having trouble connecting to our database. This might be due to:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Temporary database service interruption</li>
            <li>Network connectivity issues</li>
            <li>Invalid database configuration</li>
          </ul>
          <div className="mt-4">
            <Button
              onClick={() => {
                setHasError(false)
                setError(null)
                window.location.reload()
              }}
            >
              Try Again
            </Button>
          </div>
          {process.env.NODE_ENV === 'development' && error && (
            <pre className="mt-4 p-4 bg-gray-100 rounded text-sm overflow-auto">
              {error.message}
            </pre>
          )}
        </AlertDescription>
      </Alert>
    )
  }

  return children
}