"use client";

import { useEffect } from "react";
import { captureException } from "@sentry/nextjs";
import { isSentryEnabled } from "@/lib/sentry/config";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Last resort boundary: catches errors that break the root layout itself.
 */
export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    console.error("[Global Error]", error);
    if (isSentryEnabled()) {
      captureException(error);
    }
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          background: "#0a0a0f",
          color: "#f5f5f5",
        }}
      >
        <div role="alert" style={{ textAlign: "center", padding: "2rem" }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>
            Something went wrong
          </h1>
          <p style={{ color: "#a1a1aa", marginBottom: "1.5rem" }}>
            An unexpected error occurred. You can try again or return to the
            home page.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              padding: "0.625rem 1.5rem",
              borderRadius: "0.5rem",
              border: "none",
              background: "#4B6B76",
              color: "#ffffff",
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
