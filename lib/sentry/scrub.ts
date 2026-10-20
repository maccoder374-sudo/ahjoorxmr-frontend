/**
 * Redaction helpers for Sentry events.
 *
 * Ahjoor handles wallet addresses, e-mail addresses and auth tokens, so no
 * event may leave the app with any of them in it. The helpers are pure
 * functions without any dependency on the Sentry SDK, so they can be unit
 * tested on their own.
 */

export const REDACTED = "[redacted]";

/** Stellar public key: `G` followed by 55 base32 characters. */
const STELLAR_PUBLIC_KEY = /\bG[A-Z2-7]{55}\b/g;
/** Stellar secret key: `S` followed by 55 base32 characters. */
const STELLAR_SECRET_KEY = /\bS[A-Z2-7]{55}\b/g;
/** `0x` followed by 40 alphanumeric characters (hex addresses included). */
const HEX_ADDRESS = /\b0x[a-zA-Z0-9]{40}\b/g;
/** E-mail addresses. */
const EMAIL = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
/** `Authorization: Bearer …` style credentials. */
const AUTHORIZATION = /\b(Bearer|Basic|Token)\s+[A-Za-z0-9._~+/=-]{8,}/gi;
/** JSON web tokens. */
const JWT = /\beyJ[A-Za-z0-9_-]{4,}\.[A-Za-z0-9_-]{4,}\.[A-Za-z0-9_-]*/g;
/** Secrets passed as query parameters. */
const SECRET_QUERY_PARAM =
  /([?&](?:token|access_token|refresh_token|auth|authorization|key|secret|password|passcode|code|email|session|sid)=)[^&\s"'<>]+/gi;

/** Field names whose value is replaced entirely. */
const SENSITIVE_KEYS = new Set([
  "account",
  "accountid",
  "accountaddress",
  "accounts",
  "address",
  "addresses",
  "wallet",
  "walletaddress",
  "walletid",
  "publickey",
  "secret",
  "secretkey",
  "seed",
  "seedphrase",
  "mnemonic",
  "privatekey",
  "passphrase",
  "password",
  "pin",
  "otp",
  "token",
  "accesstoken",
  "refreshtoken",
  "idtoken",
  "authtoken",
  "authorization",
  "cookie",
  "setcookie",
  "sessionid",
  "jwt",
  "apikey",
  "email",
  "emailaddress",
  "username",
  "phone",
  "phonenumber",
  "ipaddress",
]);

/** Field names that contain one of these words. */
const SENSITIVE_KEY_PARTS =
  /address|wallet|secret|mnemonic|passphrase|password|token|authorization|cookie|apikey|privatekey|publickey|seedphrase|email|phonenumber/;

/**
 * Whether a field name holds data that must never be reported.
 */
export function isSensitiveKey(key: string): boolean {
  const normalized = key.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (SENSITIVE_KEYS.has(normalized)) return true;
  return SENSITIVE_KEY_PARTS.test(normalized);
}

/**
 * Removes wallet addresses, e-mail addresses and credentials from a string.
 */
export function scrubString(value: string): string {
  return value
    .replace(STELLAR_PUBLIC_KEY, REDACTED)
    .replace(STELLAR_SECRET_KEY, REDACTED)
    .replace(HEX_ADDRESS, REDACTED)
    .replace(AUTHORIZATION, `$1 ${REDACTED}`)
    .replace(JWT, REDACTED)
    .replace(SECRET_QUERY_PARAM, `$1${REDACTED}`)
    .replace(EMAIL, REDACTED);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

/**
 * Recursively scrubs a value: strings are cleaned, sensitive fields are
 * replaced entirely and everything else is copied as-is.
 */
export function scrubValue(value: unknown): unknown {
  if (typeof value === "string") return scrubString(value);
  if (Array.isArray(value)) return value.map((item) => scrubValue(item));
  if (isPlainObject(value)) {
    const result: Record<string, unknown> = {};
    for (const [key, entry] of Object.entries(value)) {
      result[key] = isSensitiveKey(key) ? REDACTED : scrubValue(entry);
    }
    return result;
  }
  return value;
}

/**
 * Scrubs a Sentry event: request data, headers, user information, tags,
 * breadcrumbs, contexts and exception messages are all cleaned.
 */
export function scrubEvent<T>(event: T): T {
  return scrubValue(event) as T;
}

/**
 * Scrubs a Sentry breadcrumb (console output, clicks, navigations, …).
 */
export function scrubBreadcrumb<T>(breadcrumb: T): T {
  return scrubValue(breadcrumb) as T;
}
