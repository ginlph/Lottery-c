import { ERROR_CODES } from '../../enums/error-codes';
import { AppError } from '../../utils/app-error';
import type { Middleware } from '../types';

export const adminMiddleware: Middleware = async (ctx, next) => {
  const adminToken = ctx.event.headers?.['x-admin-token'] ?? ctx.event.headers?.['X-Admin-Token'];

  // TODO: replace with admin permission system.
  if (!adminToken) {
    throw new AppError(ERROR_CODES.AUTH_FORBIDDEN_ADMIN, 'admin token is required', 403);
  }

  await next();
};
