import { lotteryService } from '../../modules/lottery';
import type { RequestContext } from '../types';

export async function drawController(ctx: RequestContext) {
  return lotteryService.draw(ctx.body as Record<string, unknown>);
}

export async function myPrizeController() {
  return lotteryService.myPrize();
}

export async function myChancesController() {
  return lotteryService.myChances();
}

export async function claimPhysicalGiftController(ctx: RequestContext) {
  return lotteryService.claimPhysicalGift(ctx.body as Record<string, unknown>);
}
