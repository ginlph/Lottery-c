import { ERROR_CODES } from '../../enums/error-codes';
import { authRepository } from '../../repositories';
import { verifyAuthToken } from '../../services';
import { AppError } from '../../utils/app-error';
import type { Middleware } from '../types';

function getAuthorization(headers: Record<string, string | undefined> | undefined): string | undefined {
  if (!headers) return undefined;
  const hit = Object.entries(headers).find(([key]) => key.toLowerCase() === 'authorization');
  return hit?.[1];
}

export const authTokenMiddleware: Middleware = async (ctx, next) => {
  const token = getAuthorization(ctx.event.headers);

  if (!token) {
    throw new AppError(ERROR_CODES.AUTH_INVALID_TOKEN, 'auth_token is required', 401);
  }

  const normalizedToken = token.startsWith('Bearer ') ? token.slice('Bearer '.length) : token;

  let payload;
  try {
    payload = await verifyAuthToken(normalizedToken);
  } catch {
    throw new AppError(ERROR_CODES.AUTH_INVALID_TOKEN, 'auth_token is invalid or expired', 401);
  }

  const profile = await authRepository.getUserProfileByToken(payload.activity_id, normalizedToken);
  if (!profile) {
    throw new AppError(ERROR_CODES.AUTH_INVALID_TOKEN, 'auth_token does not map to user profile', 401);
  }

  ctx.auth = {
    activity_id: payload.activity_id,
    user_key: payload.user_key,
    auth_token: normalizedToken
  };

  await next();
};
