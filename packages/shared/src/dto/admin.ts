import type { PaginationQuery, PaginationResult } from './common.js';
import type {
  ActivityStatus,
  ClaimStatus,
  CouponStatus,
  DrawStatus,
  PrizeType
} from '../enums/index.js';

/**
 * 管理端活动概览查询参数
 */
export interface AdminActivityOverviewQuery {
  /** 活动 ID */
  activity_id: string;
}

/**
 * 管理端活动概览响应
 */
export interface AdminActivityOverviewResponse {
  /** 活动 ID */
  activity_id: string;
  /** 活动状态 */
  activity_status: ActivityStatus;
  /** 总参与人数 */
  participant_count: number;
  /** 总抽奖次数 */
  draw_count: number;
  /** 总中奖次数 */
  win_count: number;
  /** 优惠券发放数量 */
  coupon_issued_count: number;
  /** 实物奖品发放数量 */
  gift_issued_count: number;
}

/**
 * 管理端奖品项
 */
export interface AdminPrizeItem {
  /** 奖项 ID */
  prize_id: string;
  /** 奖项类型 */
  prize_type: PrizeType;
  /** 奖项名称 */
  prize_name: string;
  /** 总库存 */
  stock_total: number;
  /** 已发放库存 */
  stock_used: number;
  /** 剩余库存 */
  stock_left: number;
  /** 权重（整数） */
  weight: number;
  /** 是否启用 */
  enabled: boolean;
}

/**
 * 管理端奖品列表响应
 */
export interface AdminPrizeListResponse {
  /** 奖项列表 */
  prizes: AdminPrizeItem[];
}

/**
 * 管理端抽奖记录查询参数
 */
export interface AdminDrawRecordsQuery extends PaginationQuery {
  /** 活动 ID */
  activity_id: string;
  /** 抽奖状态筛选 */
  draw_status?: DrawStatus;
  /** 奖项类型筛选 */
  prize_type?: PrizeType;
  /** 用户标识筛选 */
  user_key?: string;
}

/**
 * 管理端抽奖记录项
 */
export interface AdminDrawRecordItem {
  /** 抽奖记录 ID */
  draw_record_id: string;
  /** 内部用户标识 */
  user_key: string;
  /** 抽奖状态 */
  draw_status: DrawStatus;
  /** 奖项类型 */
  prize_type: PrizeType;
  /** 奖项名称 */
  prize_name: string;
  /** 券码（如有） */
  coupon_code?: string;
  /** 抽奖时间（ISO 8601） */
  draw_time: string;
}

/**
 * 管理端抽奖记录响应
 */
export type AdminDrawRecordsResponse = PaginationResult<AdminDrawRecordItem>;

/**
 * 管理端优惠券查询参数
 */
export interface AdminCouponsQuery extends PaginationQuery {
  /** 活动 ID */
  activity_id: string;
  /** 券码状态筛选 */
  coupon_status?: CouponStatus;
  /** 用户标识筛选 */
  user_key?: string;
}

/**
 * 管理端优惠券项
 */
export interface AdminCouponItem {
  /** 券码 ID */
  coupon_id: string;
  /** 券码内容 */
  coupon_code: string;
  /** 用户标识 */
  user_key: string;
  /** 券码状态 */
  coupon_status: CouponStatus;
  /** 发放时间（ISO 8601） */
  issued_at: string;
  /** 核销时间（ISO 8601） */
  used_at?: string;
}

/**
 * 管理端优惠券响应
 */
export type AdminCouponsResponse = PaginationResult<AdminCouponItem>;

/**
 * 管理端更新活动状态请求
 */
export interface AdminUpdateActivityStatusRequest {
  /** 活动 ID */
  activity_id: string;
  /** 目标活动状态 */
  activity_status: ActivityStatus;
  /** 操作人 ID（审计用途） */
  operator_id: string;
}

/**
 * 管理端更新活动状态响应
 */
export interface AdminUpdateActivityStatusResponse {
  /** 活动 ID */
  activity_id: string;
  /** 更新后状态 */
  activity_status: ActivityStatus;
  /** 更新时间（ISO 8601） */
  updated_at: string;
}

/**
 * 管理端更新奖项请求
 */
export interface AdminUpdatePrizeRequest {
  /** 活动 ID */
  activity_id: string;
  /** 奖项 ID */
  prize_id: string;
  /** 奖项名称 */
  prize_name?: string;
  /** 奖项描述 */
  prize_desc?: string;
  /** 库存总量 */
  stock_total?: number;
  /** 权重（整数） */
  weight?: number;
  /** 是否启用 */
  enabled?: boolean;
  /** 操作人 ID（审计用途） */
  operator_id: string;
}

/**
 * 管理端更新奖项响应
 */
export interface AdminUpdatePrizeResponse {
  /** 活动 ID */
  activity_id: string;
  /** 奖项 ID */
  prize_id: string;
  /** 更新后名称 */
  prize_name: string;
  /** 更新后库存总量 */
  stock_total: number;
  /** 更新后权重 */
  weight: number;
  /** 更新后启用状态 */
  enabled: boolean;
  /** 更新时间（ISO 8601） */
  updated_at: string;
}

/**
 * 管理端实物领取记录项（预留复用）
 */
export interface AdminGiftClaimItem {
  /** 领取记录 ID */
  claim_id: string;
  /** 抽奖记录 ID */
  draw_record_id: string;
  /** 用户标识 */
  user_key: string;
  /** 领取状态 */
  claim_status: ClaimStatus;
  /** 提交时间（ISO 8601） */
  submitted_at: string;
}
