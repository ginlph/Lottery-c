import { ERROR_CODES } from '../../enums/error-codes';
import { AppError } from '../../utils/app-error';
import { failure, success, type ApiResponse } from '../../utils/response';
import { withErrorHandler } from '../middlewares/error-handler';
import { traceIdMiddleware } from '../middlewares/trace-id';
import type { CloudbaseContext, CloudbaseEvent, Middleware, RequestContext } from '../types';
import { routes } from './registry';

function parseBody(body: string | undefined): unknown {
  if (!body) return {};
  try {
    return JSON.parse(body);
  } catch {
    return {};
  }
}

function findRoute(method: string, path: string) {
  return routes.find((route) => route.method === method && route.path === path);
}

async function runMiddlewares(ctx: RequestContext, middlewares: Middleware[]) {
  let index = -1;

  const dispatch = async (i: number): Promise<void> => {
    if (i <= index) {
      throw new AppError(ERROR_CODES.INTERNAL_ERROR, 'middleware called next multiple times', 500);
    }

    index = i;
    const middleware = middlewares[i];
    if (!middleware) return;
    await middleware(ctx, () => dispatch(i + 1));
  };

  await dispatch(0);
}

export async function handleApiRequest(event: CloudbaseEvent, context: CloudbaseContext): Promise<ApiResponse> {
  const ctx: RequestContext = {
    event,
    context,
    traceId: context.requestId ?? '',
    body: parseBody(event.body)
  };

  return withErrorHandler(ctx, async () => {
    await traceIdMiddleware(ctx, async () => Promise.resolve());

    const method = (event.httpMethod ?? 'GET').toUpperCase();
    const path = event.path ?? '/';
    const route = findRoute(method, path);

    if (!route) {
      return failure(ERROR_CODES.NOT_FOUND, `route not found: ${method} ${path}`, { traceId: ctx.traceId });
    }

    await runMiddlewares(ctx, route.middlewares ?? []);
    const data = await route.handler(ctx);

    return success(data, 'ok', { traceId: ctx.traceId });
  });
}
