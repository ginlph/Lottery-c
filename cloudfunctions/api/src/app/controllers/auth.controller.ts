import { authService } from '../../modules/auth';
import type { RequestContext } from '../types';

export async function verifyOrderController(ctx: RequestContext) {
  return authService.verifyOrder(ctx.body as Record<string, unknown>, {
    headers: ctx.event.headers
  });
}

export async function refreshTokenController(ctx: RequestContext) {
  return authService.refreshToken(ctx.body as Record<string, unknown>);
}
