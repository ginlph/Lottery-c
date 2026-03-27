import type { BaseDocument, CouponStatusValue, FieldDoc, IndexRecommendation } from './common';

export interface CouponCodeDocument extends BaseDocument {
  /** 活动 ID */
  activity_id: string;
  /** 奖项 ID */
  prize_id: string;
  /** 内部用户标识 */
  user_key: string;
  /** 唯一券码 */
  coupon_code: string;
  /** 券码状态 */
  status: CouponStatusValue;
  /** 券码到期时间 */
  expire_at?: string;
  /** 核销时间 */
  used_at?: string;
}

export const COUPON_CODE_FIELD_DOCS: FieldDoc<CouponCodeDocument> = {
  _id: '数据库文档 ID，由数据库自动生成。',
  activity_id: '活动 ID。',
  prize_id: '来源奖项 ID。',
  user_key: '领取该券码的用户标识。',
  coupon_code: '券码正文，必须全局唯一。',
  status: '券码状态：unused/used/expired。',
  expire_at: '券码过期时间（ISO 8601）。',
  used_at: '券码核销时间（ISO 8601）。',
  created_at: '创建时间（ISO 8601）。',
  updated_at: '更新时间（ISO 8601）。'
};

export const COUPON_CODE_INDEXES: ReadonlyArray<IndexRecommendation> = [
  {
    collection: 'coupon_codes',
    name: 'uk_coupon_code',
    fields: ['coupon_code'],
    unique: true,
    reason: '强约束：coupon_codes.coupon_code 必须唯一。'
  },
  {
    collection: 'coupon_codes',
    name: 'idx_user_coupon',
    fields: ['activity_id', 'user_key', 'status'],
    reason: '按用户查询券码列表与可用状态。'
  }
];
