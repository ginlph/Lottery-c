import type {
  BaseDocument,
  DrawStatusValue,
  FieldDoc,
  IndexRecommendation,
  PrizeTypeValue
} from './common';

export interface DrawRecordDocument extends BaseDocument {
  /** 活动 ID */
  activity_id: string;
  /** 内部用户标识 */
  user_key: string;
  /** 抽奖请求幂等 ID，必须唯一 */
  request_id: string;
  /** 抽奖结果状态 */
  draw_status: DrawStatusValue;
  /** 命中奖项 ID */
  prize_id?: string;
  /** 命中奖项类型 */
  prize_type?: PrizeTypeValue;
  /** 命中券码（优惠券场景） */
  coupon_code?: string;
  /** 请求 IP（风控） */
  request_ip?: string;
  /** 设备指纹（风控） */
  device_fingerprint?: string;
  /** 记录发生时间 */
  draw_at: string;
}

export const DRAW_RECORD_FIELD_DOCS: FieldDoc<DrawRecordDocument> = {
  _id: '数据库文档 ID，由数据库自动生成。',
  activity_id: '活动 ID。',
  user_key: '内部用户标识。',
  request_id: '抽奖请求幂等键，必须全局唯一。',
  draw_status: '抽奖状态：success/failed/pending。',
  prize_id: '命中的奖项 ID。',
  prize_type: '命中的奖项类型。',
  coupon_code: '优惠券码（仅优惠券奖项）。',
  request_ip: '请求来源 IP。',
  device_fingerprint: '设备指纹（风控）。',
  draw_at: '抽奖发生时间（ISO 8601）。',
  created_at: '创建时间（ISO 8601）。',
  updated_at: '更新时间（ISO 8601）。'
};

export const DRAW_RECORD_INDEXES: ReadonlyArray<IndexRecommendation> = [
  {
    collection: 'draw_records',
    name: 'uk_request_id',
    fields: ['request_id'],
    unique: true,
    reason: '强约束：draw_records.request_id 必须唯一，实现幂等。'
  },
  {
    collection: 'draw_records',
    name: 'idx_user_timeline',
    fields: ['activity_id', 'user_key', 'draw_at'],
    reason: '查询用户中奖历史与时间线。'
  }
];
