import { ERROR_CODES } from '../../enums/error-codes';
import { AppError } from '../../utils/app-error';
import { failure, type ApiResponse } from '../../utils/response';
import type { RequestContext } from '../types';

export async function withErrorHandler(ctx: RequestContext, run: () => Promise<ApiResponse>): Promise<ApiResponse> {
  try {
    return await run();
  } catch (error) {
    if (error instanceof AppError) {
      return failure(error.code, error.message, { traceId: ctx.traceId }, { details: error.details });
    }

    return failure(ERROR_CODES.INTERNAL_ERROR, 'internal server error', { traceId: ctx.traceId });
  }
}
