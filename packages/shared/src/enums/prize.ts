/**
 * 奖项类型（MVP 固定枚举，禁止扩展）
 */
export enum PrizeType {
  /** 再来一次 */
  Retry = 'retry',
  /** 优惠券 */
  DiscountCoupon = 'discount_coupon',
  /** 实物礼品 */
  PhysicalGift = 'physical_gift',
  /** 未中奖 */
  None = 'none'
}

/**
 * 抽奖记录状态
 */
export enum DrawStatus {
  /** 抽奖成功并已记录 */
  Success = 'success',
  /** 抽奖失败（如幂等冲突、风控拦截） */
  Failed = 'failed',
  /** 等待后端异步处理（预留） */
  Pending = 'pending'
}

/**
 * 券码状态
 */
export enum CouponStatus {
  /** 可使用 */
  Unused = 'unused',
  /** 已核销 */
  Used = 'used',
  /** 已过期 */
  Expired = 'expired'
}

/**
 * 实物礼品领取状态
 */
export enum ClaimStatus {
  /** 待领取 */
  Unclaimed = 'unclaimed',
  /** 已提交领取信息 */
  Claimed = 'claimed',
  /** 领取审核未通过 */
  Rejected = 'rejected'
}
