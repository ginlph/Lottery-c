import type { ActivityStatus, ActivityViewStatus, PrizeType } from '../enums/index.js';

/**
 * 获取活动配置查询参数
 */
export interface GetActivityConfigQuery {
  /** 活动 ID */
  activity_id: string;
}

/**
 * 活动奖项配置
 */
export interface ActivityPrizeConfig {
  /** 奖项 ID */
  prize_id: string;
  /** 奖项类型 */
  prize_type: PrizeType;
  /** 奖项展示名称 */
  prize_name: string;
  /** 奖项展示文案 */
  prize_desc: string;
}

/**
 * 获取活动配置响应
 */
export interface GetActivityConfigResponse {
  /** 活动 ID */
  activity_id: string;
  /** 活动标题 */
  title: string;
  /** 活动说明 */
  subtitle?: string;
  /** 活动开始时间（ISO 8601） */
  start_time: string;
  /** 活动结束时间（ISO 8601） */
  end_time: string;
  /** 后台状态 */
  activity_status: ActivityStatus;
  /** 前台展示状态 */
  view_status: ActivityViewStatus;
  /** 用户总可用抽奖次数 */
  user_total_chances: number;
  /** 奖项列表（前端渲染用） */
  prizes: ActivityPrizeConfig[];
}
