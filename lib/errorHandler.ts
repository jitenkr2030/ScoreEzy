import * as Sentry from "@sentry/nextjs"

export function initErrorHandling() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
  })
}

export function logError(error: Error, context?: any) {
  console.error("Error occurred:", error)
  Sentry.captureException(error, { extra: context })
}

