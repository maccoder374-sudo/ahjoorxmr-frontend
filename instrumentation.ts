import * as Sentry from "@sentry/nextjs";

/**
 * Next.js instrumentation hook: the server runtime loads the Node.js config,
 * the edge runtime loads the edge config. Both configs are no-ops when no
 * DSN is configured.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

/**
 * Reports errors thrown while rendering the app (including nested server
 * components) to Sentry.
 */
export const onRequestError = Sentry.captureRequestError;
