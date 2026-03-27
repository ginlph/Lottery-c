import { ERROR_CODES } from '../../enums/error-codes';
import { AppError } from '../../utils/app-error';
import type { Middleware } from '../types';

export type Validator<T> = (payload: unknown) => T;

export function validateBody<T>(validator: Validator<T>): Middleware {
  return async (ctx, next) => {
    try {
      ctx.body = validator(ctx.body);
    } catch (error) {
      throw new AppError(
        ERROR_CODES.BAD_REQUEST,
        'invalid request payload',
        400,
        error instanceof Error ? error.message : error
      );
    }

    await next();
  };
}
