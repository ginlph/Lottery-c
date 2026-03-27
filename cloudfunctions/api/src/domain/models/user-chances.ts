import type { BaseDocument, FieldDoc, IndexRecommendation } from './common';

export interface UserChanceDocument extends BaseDocument {
  /** 活动 ID */
  activity_id: string;
  /** 内部用户标识 */
  user_key: string;
  /** 总抽奖次数 */
  total_chances: number;
  /** 已使用次数 */
  used_chances: number;
  /** 剩余次数（可冗余以提升查询效率） */
  remaining_chances: number;
}

export const USER_CHANCE_FIELD_DOCS: FieldDoc<UserChanceDocument> = {
  _id: '数据库文档 ID，由数据库自动生成。',
  activity_id: '活动 ID。',
  user_key: '内部用户标识。',
  total_chances: '总抽奖次数。',
  used_chances: '已消耗抽奖次数。',
  remaining_chances: '剩余抽奖次数。',
  created_at: '创建时间（ISO 8601）。',
  updated_at: '更新时间（ISO 8601）。'
};

export const USER_CHANCE_INDEXES: ReadonlyArray<IndexRecommendation> = [
  {
    collection: 'user_chances',
    name: 'uk_activity_user_key',
    fields: ['activity_id', 'user_key'],
    unique: true,
    reason: '强约束：user_chances(activity_id, user_key) 唯一。'
  }
];
