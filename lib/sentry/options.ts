import type { Breadcrumb, ErrorEvent, Event } from "@sentry/nextjs";
import { getSentryDsn } from "./config";
import { scrubBreadcrumb, scrubEvent } from "./scrub";

/**
 * Options shared by the client, server and edge Sentry configs.
 *
 * `sendDefaultPii` stays off and the `beforeSend`/`beforeBreadcrumb` hooks
 * strip wallet addresses, e-mail addresses and credentials from every event.
 */
export function sentryOptions() {
  return {
    dsn: getSentryDsn(),
    environment: process.env.NODE_ENV,
    sendDefaultPii: false,
    // The edge runtime types the event more narrowly than the browser and the
    // node runtime, so the hook returns the narrowest shape the SDK accepts.
    beforeSend: (event: Event) => scrubEvent(event) as ErrorEvent,
    beforeBreadcrumb: (breadcrumb: Breadcrumb) => scrubBreadcrumb(breadcrumb),
  };
}
