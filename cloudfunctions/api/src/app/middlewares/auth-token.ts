import { ERROR_CODES } from '../../enums/error-codes';
import { AppError } from '../../utils/app-error';
import type { Middleware } from '../types';

function getAuthorization(headers: Record<string, string | undefined> | undefined): string | undefined {
  if (!headers) return undefined;
  const hit = Object.entries(headers).find(([key]) => key.toLowerCase() === 'authorization');
  return hit?.[1];
}

export const authTokenMiddleware: Middleware = async (ctx, next) => {
  const token = getAuthorization(ctx.event.headers);

  // TODO: replace with auth module token verification.
  if (!token) {
    throw new AppError(ERROR_CODES.AUTH_INVALID_TOKEN, 'auth_token is required', 401);
  }

  await next();
};
