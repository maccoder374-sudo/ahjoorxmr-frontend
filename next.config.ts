import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs/config";

const nextConfig: NextConfig = {
  /* config options here */
};

// Sentry is optional: the source maps are only uploaded when a DSN is
// configured, and the upload additionally needs an organisation, a project
// and an auth token.
const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
const sentryAuthToken = process.env.SENTRY_AUTH_TOKEN;
const sentryUploadEnabled = Boolean(sentryDsn && sentryAuthToken);

export default withSentryConfig(nextConfig, {
  ...(sentryUploadEnabled
    ? {
        org: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
        authToken: sentryAuthToken,
        silent: false,
        sourcemaps: { disable: false as const },
      }
    : {
        silent: true,
        sourcemaps: { disable: true as const },
      }),
  telemetry: false,
  widenClientFileUpload: true,
});
