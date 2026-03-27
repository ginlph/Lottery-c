import { activityService } from '../../modules/activity';
import type { RequestContext } from '../types';

export async function getActivityConfigController(ctx: RequestContext) {
  return activityService.getConfig(ctx.event.queryStringParameters ?? {});
}
