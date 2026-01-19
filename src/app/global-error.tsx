"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

/**
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/error#props
 */
type GlobalErrorProps = {
  /**
   * The error that was thrown. Includes an optional `digest` property
   * which is a hash of the error generated during server-side rendering,
   * useful for matching errors in server logs.
   */
  error: Error & { digest?: string };
  /**
   * Function to attempt recovery by re-rendering the root layout.
   * Calling this will try to render the application again, which may
   * succeed if the error was caused by a transient issue.
   */
  reset: () => void;
};

/**
 * Global error boundary for the Next.js App Router application.
 *
 * This component catches unhandled errors at the root level, including errors
 * in the root layout. It replaces the entire document (including `<html>` and
 * `<body>` tags) when an error occurs, providing a fallback UI.
 *
 * @remarks
 * - Uses inline styles instead of Tailwind/CSS because stylesheets may fail
 *   to load when a critical error occurs at the root level. Inline styles
 *   ensure the error UI renders correctly regardless of CSS availability.
 * - Automatically reports errors to Sentry with contextual metadata for
 *   debugging and monitoring.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/error-handling#handling-errors-in-root-layouts
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    Sentry.captureException(error, {
      tags: { errorBoundary: "global" },
      extra: { digest: error.digest },
    });
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "1rem",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
          >
            Something went wrong
          </h1>
          <p
            style={{
              color: "#6b7280",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            An unexpected error occurred. Our team has been notified.
          </p>
          <button
            onClick={reset}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: 500,
            }}
            type="button"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
