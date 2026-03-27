import type { BaseDocument, ClaimStatusValue, FieldDoc, IndexRecommendation } from './common';

export interface PhysicalGiftClaimDocument extends BaseDocument {
  /** 活动 ID */
  activity_id: string;
  /** 抽奖记录 ID */
  draw_record_id: string;
  /** 奖项 ID */
  prize_id: string;
  /** 内部用户标识 */
  user_key: string;
  /** 收件人姓名 */
  receiver_name?: string;
  /** 收件人手机号 */
  receiver_mobile?: string;
  /** 省市区与详细地址 */
  receiver_address?: string;
  /** 领取状态 */
  claim_status: ClaimStatusValue;
  /** 提交领取时间 */
  claimed_at?: string;
}

export const PHYSICAL_GIFT_CLAIM_FIELD_DOCS: FieldDoc<PhysicalGiftClaimDocument> = {
  _id: '数据库文档 ID，由数据库自动生成。',
  activity_id: '活动 ID。',
  draw_record_id: '对应中奖抽奖记录 ID。',
  prize_id: '实物奖项 ID。',
  user_key: '中奖用户标识。',
  receiver_name: '收件人姓名。',
  receiver_mobile: '收件人手机号。',
  receiver_address: '收件地址。',
  claim_status: '实物领取状态：unclaimed/claimed/rejected。',
  claimed_at: '提交领取信息时间（ISO 8601）。',
  created_at: '创建时间（ISO 8601）。',
  updated_at: '更新时间（ISO 8601）。'
};

export const PHYSICAL_GIFT_CLAIM_INDEXES: ReadonlyArray<IndexRecommendation> = [
  {
    collection: 'physical_gift_claims',
    name: 'uk_draw_record_id',
    fields: ['draw_record_id'],
    unique: true,
    reason: '每条中奖记录最多绑定一条实物领取信息。'
  },
  {
    collection: 'physical_gift_claims',
    name: 'idx_activity_claim_status',
    fields: ['activity_id', 'claim_status', 'created_at'],
    reason: '管理端按领取状态查看待处理列表。'
  }
];
