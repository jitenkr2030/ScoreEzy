import { toast } from "sonner"
import React from 'react'

interface ErrorConfig {
  retryAttempts?: number
  retryDelay?: number
  fallbackValue?: any
  logError?: boolean
  showToast?: boolean
}

interface ErrorMetadata {
  timestamp: string
  component?: string
  action?: string
  userId?: string
  additionalInfo?: Record<string, any>
}

class ErrorLogger {
  private static instance: ErrorLogger
  private errors: Array<{ error: Error; metadata: ErrorMetadata }> = []

  private constructor() {}

  public static getInstance(): ErrorLogger {
    if (!ErrorLogger.instance) {
      ErrorLogger.instance = new ErrorLogger()
    }
    return ErrorLogger.instance
  }

  public log(error: Error, metadata: ErrorMetadata): void {
    this.errors.push({ error, metadata })
    console.error('Error:', error, '\nMetadata:', metadata)
    
    // Here you would typically send the error to your error tracking service
    // Example: Sentry.captureException(error, { extra: metadata })
  }

  public getRecentErrors(): Array<{ error: Error; metadata: ErrorMetadata }> {
    return this.errors.slice(-10) // Return last 10 errors
  }
}

export async function withErrorHandling<T>(
  operation: () => Promise<T>,
  config: ErrorConfig = {}
): Promise<T> {
  const {
    retryAttempts = 3,
    retryDelay = 1000,
    fallbackValue,
    logError = true,
    showToast = true
  } = config

  const logger = ErrorLogger.getInstance()
  let lastError: Error

  for (let attempt = 1; attempt <= retryAttempts; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error as Error

      if (logError) {
        logger.log(lastError, {
          timestamp: new Date().toISOString(),
          action: operation.name,
          additionalInfo: { attempt }
        })
      }

      if (attempt === retryAttempts) {
        if (showToast) {
          toast.error(
            'An error occurred',
            {
              description: getUserFriendlyMessage(lastError),
              action: {
                label: 'Retry',
                onClick: () => withErrorHandling(operation, config)
              }
            }
          )
        }

        if (fallbackValue !== undefined) {
          return fallbackValue
        }
        throw lastError
      }

      await new Promise(resolve => setTimeout(resolve, retryDelay * attempt))
    }
  }

  throw lastError!
}

function getUserFriendlyMessage(error: Error): string {
  // Map technical error messages to user-friendly ones
  const errorMessages: Record<string, string> = {
    'NETWORK_ERROR': 'Please check your internet connection and try again.',
    'UNAUTHORIZED': 'Your session has expired. Please log in again.',
    'NOT_FOUND': 'The requested resource could not be found.',
    'FORBIDDEN': 'You don\'t have permission to perform this action.',
    'DATABASE_ERROR': 'We\'re having trouble accessing our database. Please try again later.'
  }

  // Extract error code or use message
  const errorCode = error.name || error.message.split(':')[0].trim().toUpperCase()
  return errorMessages[errorCode] || 'Something went wrong. Please try again later.'
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export function createErrorBoundary(fallback: React.ReactNode) {
  return class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state = { hasError: false }

    static getDerivedStateFromError() {
      return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      ErrorLogger.getInstance().log(error, {
        timestamp: new Date().toISOString(),
        component: this.constructor.name,
        additionalInfo: errorInfo
      })
    }

    render() {
      if (this.state.hasError) {
        return fallback
      }
      return this.props.children
    }
  }
}