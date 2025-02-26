import * as Sentry from "@sentry/nextjs"

export function initErrorHandling() {
  if (!process.env.SENTRY_DSN) {
    console.warn('SENTRY_DSN is not set. Error tracking will be limited to console logging.')
    return
  }

  try {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: 1.0,
      environment: process.env.NODE_ENV,
      beforeSend(event) {
        if (event.exception) {
          Sentry.showReportDialog({ eventId: event.event_id })
        }
        return event
      },
    })
  } catch (error) {
    console.error('Failed to initialize Sentry:', error)
  }
}

export function logError(error: Error, context?: any) {
  console.error('Error occurred:', {
    message: error.message,
    stack: error.stack,
    context,
  })

  if (process.env.SENTRY_DSN) {
    Sentry.withScope((scope) => {
      if (context) {
        scope.setExtras(context)
      }
      Sentry.captureException(error)
    })
  }
}

