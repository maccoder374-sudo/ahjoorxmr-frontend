/**
 * Sentry is optional: when no DSN is configured the SDK is never
 * initialised, nothing is captured and the app behaves exactly as before.
 */

export const SENTRY_DSN_ENV_VAR = "NEXT_PUBLIC_SENTRY_DSN";

export function getSentryDsn(): string | undefined {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN?.trim();
  return dsn ? dsn : undefined;
}

export function isSentryEnabled(): boolean {
  return getSentryDsn() !== undefined;
}
