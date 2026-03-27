import type { IndexRecommendation } from './common';
import { ACTIVITY_INDEXES } from './activities';
import { PRIZE_INDEXES } from './prizes';
import { ORDER_CREDENTIAL_INDEXES } from './order-credentials';
import { USER_PROFILE_INDEXES } from './user-profiles';
import { USER_CHANCE_INDEXES } from './user-chances';
import { DRAW_RECORD_INDEXES } from './draw-records';
import { COUPON_CODE_INDEXES } from './coupon-codes';
import { PHYSICAL_GIFT_CLAIM_INDEXES } from './physical-gift-claims';
import { REQUEST_LOCK_INDEXES } from './request-locks';

export const INDEX_RECOMMENDATIONS: ReadonlyArray<IndexRecommendation> = [
  ...ACTIVITY_INDEXES,
  ...PRIZE_INDEXES,
  ...ORDER_CREDENTIAL_INDEXES,
  ...USER_PROFILE_INDEXES,
  ...USER_CHANCE_INDEXES,
  ...DRAW_RECORD_INDEXES,
  ...COUPON_CODE_INDEXES,
  ...PHYSICAL_GIFT_CLAIM_INDEXES,
  ...REQUEST_LOCK_INDEXES
];
