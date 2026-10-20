import * as Sentry from "@sentry/nextjs";
import { isSentryEnabled } from "./lib/sentry/config";
import { sentryOptions } from "./lib/sentry/options";

/**
 * Browser Sentry configuration.
 *
 * Without a DSN the SDK is not initialised at all, so the client bundle
 * behaves exactly like it did before the integration.
 */
if (isSentryEnabled()) {
  Sentry.init(sentryOptions());
}
