export type CollectionName =
  | 'activities'
  | 'prizes'
  | 'order_credentials'
  | 'user_profiles'
  | 'user_chances'
  | 'draw_records'
  | 'coupon_codes'
  | 'physical_gift_claims'
  | 'request_locks';

export interface BaseDocument {
  /** 文档 ID（由数据库生成） */
  _id?: string;
  /** 创建时间 */
  created_at: string;
  /** 更新时间 */
  updated_at: string;
}

export type ActivityStatusValue = 'draft' | 'online' | 'offline' | 'ended';
export type PrizeTypeValue = 'retry' | 'discount_coupon' | 'physical_gift' | 'none';
export type DrawStatusValue = 'success' | 'failed' | 'pending';
export type CouponStatusValue = 'unused' | 'used' | 'expired';
export type ClaimStatusValue = 'unclaimed' | 'claimed' | 'rejected';

export interface IndexRecommendation {
  /** 索引所属集合 */
  collection: CollectionName;
  /** 索引名称 */
  name: string;
  /** 索引字段顺序 */
  fields: ReadonlyArray<string>;
  /** 是否唯一索引 */
  unique?: boolean;
  /** 索引说明 */
  reason: string;
}

export type FieldDoc<T extends object> = {
  [K in keyof T]-?: string;
};
