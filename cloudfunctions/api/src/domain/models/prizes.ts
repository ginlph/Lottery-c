import type { BaseDocument, FieldDoc, IndexRecommendation, PrizeTypeValue } from './common';

export interface PrizeDocument extends BaseDocument {
  /** 奖项业务 ID */
  prize_id: string;
  /** 归属活动 ID */
  activity_id: string;
  /** 奖项名称 */
  title: string;
  /** 奖项类型 */
  prize_type: PrizeTypeValue;
  /** 权重（整数权重法） */
  weight: number;
  /** 总库存（retry/none 可设为 0 或大值） */
  stock_total: number;
  /** 已发放数量 */
  stock_issued: number;
  /** 奖项排序权重（前台展示） */
  sort_order: number;
  /** 是否可参与抽奖 */
  is_enabled: boolean;
}

export const PRIZE_FIELD_DOCS: FieldDoc<PrizeDocument> = {
  _id: '数据库文档 ID，由数据库自动生成。',
  prize_id: '奖项业务主键。',
  activity_id: '所属活动 ID。',
  title: '奖项名称。',
  prize_type: '奖项类型：retry/discount_coupon/physical_gift/none。',
  weight: '后端整数权重抽奖用权重值，必须为非负整数。',
  stock_total: '奖项总库存。',
  stock_issued: '已发放数量，用于库存扣减与超发保护。',
  sort_order: '前台排序字段。',
  is_enabled: '奖项是否在奖池中生效。',
  created_at: '创建时间（ISO 8601）。',
  updated_at: '更新时间（ISO 8601）。'
};

export const PRIZE_INDEXES: ReadonlyArray<IndexRecommendation> = [
  {
    collection: 'prizes',
    name: 'uk_prize_id',
    fields: ['prize_id'],
    unique: true,
    reason: '按 prize_id 精确定位奖项。'
  },
  {
    collection: 'prizes',
    name: 'idx_activity_enabled',
    fields: ['activity_id', 'is_enabled', 'sort_order'],
    reason: '抽奖时加载活动的有效奖池，并保持稳定排序。'
  }
];
