import type { Middleware } from '../types';

function getHeaderValue(headers: Record<string, string | undefined> | undefined, key: string): string | undefined {
  if (!headers) return undefined;
  const lowerKey = key.toLowerCase();
  const hit = Object.entries(headers).find(([k]) => k.toLowerCase() === lowerKey);
  return hit?.[1];
}

function createTraceId(): string {
  return `trace_${Date.now()}_${Math.random().toString(16).slice(2, 10)}`;
}

export const traceIdMiddleware: Middleware = async (ctx, next) => {
  const traceFromHeader = getHeaderValue(ctx.event.headers, 'x-trace-id');
  ctx.traceId = traceFromHeader ?? ctx.context.requestId ?? createTraceId();
  await next();
};
