import * as Sentry from "@sentry/nextjs";
import { isSentryEnabled } from "./lib/sentry/config";
import { sentryOptions } from "./lib/sentry/options";

/**
 * Node.js (server) Sentry configuration, loaded from `instrumentation.ts`.
 *
 * Without a DSN the SDK is not initialised at all.
 */
if (isSentryEnabled()) {
  Sentry.init(sentryOptions());
}
