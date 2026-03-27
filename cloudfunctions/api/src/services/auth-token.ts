import type { AuthTokenPayload, TokenIssueResult } from '../domain/auth';

const TOKEN_TTL_SECONDS = 60 * 60 * 24;
const DEFAULT_AUTH_SECRET = 'lottery-dev-auth-secret';

function getAuthSecret() {
  const maybeProcess = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process;
  return maybeProcess?.env?.AUTH_TOKEN_SECRET ?? DEFAULT_AUTH_SECRET;
}

function base64UrlEncode(input: string): string {
  return btoa(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlDecode(input: string): string {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
  return atob(padded);
}

async function signMessage(message: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  const signature = String.fromCharCode(...new Uint8Array(signatureBuffer));
  return base64UrlEncode(signature);
}

export async function issueAuthToken(activityId: string, userKey: string): Promise<TokenIssueResult> {
  const nowSeconds = Math.floor(Date.now() / 1000);
  const payload: AuthTokenPayload = {
    activity_id: activityId,
    user_key: userKey,
    iat: nowSeconds,
    exp: nowSeconds + TOKEN_TTL_SECONDS
  };

  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = base64UrlEncode(JSON.stringify(payload));
  const message = `${header}.${body}`;
  const signature = await signMessage(message, getAuthSecret());

  return {
    auth_token: `${message}.${signature}`,
    token_expire_at: new Date(payload.exp * 1000).toISOString()
  };
}

export async function verifyAuthToken(token: string): Promise<AuthTokenPayload> {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('invalid token format');
  }

  const [header, body, signature] = parts;
  if (!header || !body || !signature) {
    throw new Error('invalid token format');
  }
  const message = `${header}.${body}`;
  const expected = await signMessage(message, getAuthSecret());
  if (expected !== signature) {
    throw new Error('invalid token signature');
  }

  const payload = JSON.parse(base64UrlDecode(body)) as AuthTokenPayload;
  if (payload.exp * 1000 <= Date.now()) {
    throw new Error('token expired');
  }
  return payload;
}
