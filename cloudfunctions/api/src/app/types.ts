export interface CloudbaseContext {
  requestId?: string;
}

export interface CloudbaseEvent {
  path?: string;
  httpMethod?: string;
  headers?: Record<string, string | undefined>;
  queryStringParameters?: Record<string, string | undefined>;
  body?: string;
}

export interface RequestContext {
  event: CloudbaseEvent;
  context: CloudbaseContext;
  traceId: string;
  body: unknown;
}

export type Middleware = (ctx: RequestContext, next: () => Promise<void>) => Promise<void>;

export type RequestHandler<T = unknown> = (ctx: RequestContext) => Promise<T>;

export interface RouteDefinition<T = unknown> {
  method: string;
  path: string;
  middlewares?: Middleware[];
  handler: RequestHandler<T>;
}
