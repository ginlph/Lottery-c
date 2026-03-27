/**
 * 通用错误码（1000-1099）
 */
export enum CommonErrorCode {
  /** 成功 */
  Success = 0,
  /** 通用参数错误 */
  InvalidParams = 1000,
  /** 未登录或令牌缺失 */
  Unauthorized = 1001,
  /** 无权限访问 */
  Forbidden = 1002,
  /** 资源不存在 */
  NotFound = 1003,
  /** 请求过于频繁 */
  TooManyRequests = 1004,
  /** 系统内部错误 */
  InternalError = 1099
}

/**
 * 活动模块错误码（2001-2099）
 */
export enum ActivityErrorCode {
  /** 活动不存在 */
  ActivityNotFound = 2001,
  /** 活动未开始 */
  ActivityNotStarted = 2002,
  /** 活动已结束 */
  ActivityEnded = 2003,
  /** 活动已下线 */
  ActivityOffline = 2004,
  /** 活动状态不允许该操作 */
  InvalidActivityStatus = 2005
}

/**
 * 认证模块错误码（3001-3099）
 */
export enum AuthErrorCode {
  /** 订单凭证无效 */
  InvalidOrderCredential = 3001,
  /** 订单凭证校验失败 */
  VerifyOrderFailed = 3002,
  /** 令牌无效 */
  InvalidToken = 3003,
  /** 令牌过期 */
  TokenExpired = 3004,
  /** 刷新令牌失败 */
  RefreshTokenFailed = 3005
}

/**
 * 抽奖模块错误码（4001-4099）
 */
export enum LotteryErrorCode {
  /** 抽奖请求重复 */
  DuplicateRequest = 4001,
  /** 抽奖次数不足 */
  ChancesNotEnough = 4002,
  /** 奖池不可用 */
  PrizePoolUnavailable = 4003,
  /** 奖品库存不足 */
  PrizeOutOfStock = 4004,
  /** 抽奖状态异常 */
  InvalidDrawStatus = 4005
}

/**
 * 券码模块错误码（5001-5099）
 */
export enum CouponErrorCode {
  /** 券码不存在 */
  CouponNotFound = 5001,
  /** 券码已使用 */
  CouponAlreadyUsed = 5002,
  /** 券码已过期 */
  CouponExpired = 5003,
  /** 券码生成失败 */
  CouponGenerateFailed = 5004
}

/**
 * 实物礼品模块错误码（6001-6099）
 */
export enum GiftErrorCode {
  /** 礼品领取记录不存在 */
  ClaimNotFound = 6001,
  /** 礼品已领取 */
  GiftAlreadyClaimed = 6002,
  /** 礼品领取信息非法 */
  InvalidClaimInfo = 6003,
  /** 礼品发货状态异常 */
  InvalidGiftStatus = 6004
}
