import type { BaseDocument, FieldDoc, IndexRecommendation } from './common';

export interface OrderCredentialDocument extends BaseDocument {
  /** 活动 ID */
  activity_id: string;
  /** 外部订单号（仅用于资格校验，不作为主身份） */
  order_no: string;
  /** 手机号后四位（可选增强校验） */
  mobile_tail4?: string;
  /** 购买渠道（可选增强校验） */
  purchase_channel?: string;
  /** 产品编码（可选增强校验） */
  product_code?: string;
  /** 凭证是否已领取（已兑换为 user_key） */
  is_claimed: boolean;
  /** 绑定的内部用户标识（领取后必填） */
  claimed_user_key?: string;
  /** 领取时间 */
  claimed_at?: string;
}

export const ORDER_CREDENTIAL_FIELD_DOCS: FieldDoc<OrderCredentialDocument> = {
  _id: '数据库文档 ID，由数据库自动生成。',
  activity_id: '活动 ID。',
  order_no: '外部订单号，注意不能直接作为 user_key。',
  mobile_tail4: '可选增强校验字段：手机号后四位。',
  purchase_channel: '可选增强校验字段：购买渠道。',
  product_code: '可选增强校验字段：商品编码。',
  is_claimed: '订单凭证是否已兑换资格。',
  claimed_user_key: '已兑换时绑定的内部 user_key。',
  claimed_at: '凭证被兑换的时间（ISO 8601）。',
  created_at: '创建时间（ISO 8601）。',
  updated_at: '更新时间（ISO 8601）。'
};

export const ORDER_CREDENTIAL_INDEXES: ReadonlyArray<IndexRecommendation> = [
  {
    collection: 'order_credentials',
    name: 'uk_activity_order',
    fields: ['activity_id', 'order_no'],
    unique: true,
    reason: '校验订单凭证并防止同一活动订单重复入库。'
  },
  {
    collection: 'order_credentials',
    name: 'idx_claim_status',
    fields: ['activity_id', 'is_claimed', 'claimed_user_key'],
    reason: '管理端与服务端定位未领取/已领取的订单凭证。'
  }
];
