/**
 * 需要在 repository 层封装的数据库读写操作清单。
 */
export const REPOSITORY_OPERATION_CHECKLIST = {
  activities: [
    'getActivityByActivityId(activityId)',
    'updateActivityStatus(activityId, status)',
    'getActivityOverview(activityId)'
  ],
  prizes: [
    'listEffectivePrizes(activityId)',
    'updatePrizeStockAtomically(prizeId, expectedIssued, nextIssued)',
    'listPrizesByActivity(activityId)'
  ],
  orderCredentials: [
    'getOrderCredential(activityId, orderNo)',
    'claimOrderCredential(activityId, orderNo, userKey)',
    'insertOrderCredentials(docs)'
  ],
  userProfiles: [
    'createOrUpdateUserProfileByOrder(activityId, orderNo, userKey, authToken, tokenExpireAt)',
    'getUserProfileByToken(activityId, authToken)',
    'getUserProfileByUserKey(activityId, userKey)'
  ],
  userChances: [
    'initUserChances(activityId, userKey, totalChances)',
    'consumeChance(activityId, userKey)',
    'getUserChances(activityId, userKey)'
  ],
  drawRecords: [
    'createDrawRecord(record)',
    'getDrawRecordByRequestId(requestId)',
    'listDrawRecordsByUser(activityId, userKey)',
    'listDrawRecordsByActivity(activityId, filters)'
  ],
  couponCodes: [
    'createCouponCode(record)',
    'getCouponByCode(couponCode)',
    'listCouponsByUser(activityId, userKey)',
    'markCouponUsed(couponCode, usedAt)'
  ],
  physicalGiftClaims: [
    'createPhysicalGiftClaim(record)',
    'updatePhysicalGiftClaim(drawRecordId, payload)',
    'getPhysicalGiftClaimByDrawRecordId(drawRecordId)',
    'listPhysicalGiftClaims(activityId, claimStatus)'
  ],
  requestLocks: [
    'acquireLock(lockKey, requestId, activityId, userKey, expireAt)',
    'releaseLock(lockKey, releasedAt)',
    'getLockByRequestId(requestId)',
    'deleteExpiredLocks(expireBefore)'
  ]
} as const;
