import { adminService } from '../../modules/admin';
import type { RequestContext } from '../types';

export async function activityOverviewController() {
  return adminService.getActivityOverview();
}

export async function adminPrizesController() {
  return adminService.getPrizes();
}

export async function adminDrawRecordsController() {
  return adminService.getDrawRecords();
}

export async function adminCouponsController() {
  return adminService.getCoupons();
}

export async function updateActivityStatusController(ctx: RequestContext) {
  return adminService.updateActivityStatus(ctx.body as Record<string, unknown>);
}

export async function updatePrizeController(ctx: RequestContext) {
  return adminService.updatePrize(ctx.body as Record<string, unknown>);
}
