import type { ClaimStatus, CouponStatus, DrawStatus, PrizeType } from '../enums/index.js';

/**
 * 发起抽奖请求
 */
export interface DrawLotteryRequest {
  /** 活动 ID */
  activity_id: string;
  /** 幂等请求 ID（每次抽奖必须唯一） */
  request_id: string;
  /** 鉴权令牌（不允许仅凭 user_key 发起抽奖） */
  auth_token: string;
  /** 内部用户标识（可用于风控与日志） */
  user_key?: string;
  /** 设备指纹（可选，风控辅助） */
  device_fingerprint?: string;
}

/**
 * 抽奖结果
 */
export interface DrawLotteryResponse {
  /** 抽奖记录 ID */
  draw_record_id: string;
  /** 抽奖状态 */
  draw_status: DrawStatus;
  /** 奖项 ID */
  prize_id: string;
  /** 奖项类型 */
  prize_type: PrizeType;
  /** 奖项名称 */
  prize_name: string;
  /** 是否中奖 */
  is_win: boolean;
  /** 券码（优惠券中奖时返回） */
  coupon_code?: string;
  /** 剩余抽奖次数 */
  remaining_chances: number;
  /** 抽奖时间（ISO 8601） */
  draw_time: string;
}

/**
 * 获取我的奖品查询参数
 */
export interface GetMyPrizeQuery {
  /** 活动 ID */
  activity_id: string;
  /** 内部用户标识 */
  user_key: string;
  /** 鉴权令牌 */
  auth_token: string;
}

/**
 * 我的奖品项
 */
export interface MyPrizeItem {
  /** 抽奖记录 ID */
  draw_record_id: string;
  /** 奖项 ID */
  prize_id: string;
  /** 奖项类型 */
  prize_type: PrizeType;
  /** 奖项名称 */
  prize_name: string;
  /** 券码（仅优惠券奖品） */
  coupon_code?: string;
  /** 券码状态（仅优惠券奖品） */
  coupon_status?: CouponStatus;
  /** 实物领取状态（仅实物奖品） */
  claim_status?: ClaimStatus;
  /** 获奖时间（ISO 8601） */
  won_at: string;
}

/**
 * 获取我的奖品响应
 */
export interface GetMyPrizeResponse {
  /** 奖品记录列表 */
  prizes: MyPrizeItem[];
}

/**
 * 获取我的抽奖次数查询参数
 */
export interface GetMyChancesQuery {
  /** 活动 ID */
  activity_id: string;
  /** 内部用户标识 */
  user_key: string;
  /** 鉴权令牌 */
  auth_token: string;
}

/**
 * 获取我的抽奖次数响应
 */
export interface GetMyChancesResponse {
  /** 当前可用次数 */
  remaining_chances: number;
  /** 总分配次数 */
  total_chances: number;
  /** 已使用次数 */
  used_chances: number;
}

/**
 * 实物礼品领取请求
 */
export interface ClaimPhysicalGiftRequest {
  /** 活动 ID */
  activity_id: string;
  /** 抽奖记录 ID */
  draw_record_id: string;
  /** 内部用户标识 */
  user_key: string;
  /** 鉴权令牌 */
  auth_token: string;
  /** 收件人姓名 */
  receiver_name: string;
  /** 收件人手机号 */
  receiver_phone: string;
  /** 省份 */
  province: string;
  /** 城市 */
  city: string;
  /** 区县 */
  district: string;
  /** 详细地址 */
  detail_address: string;
}

/**
 * 实物礼品领取响应
 */
export interface ClaimPhysicalGiftResponse {
  /** 领取记录 ID */
  claim_id: string;
  /** 当前领取状态 */
  claim_status: ClaimStatus;
  /** 提交时间（ISO 8601） */
  submitted_at: string;
}
