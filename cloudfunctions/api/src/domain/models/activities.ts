import type {
  ActivityStatusValue,
  BaseDocument,
  FieldDoc,
  IndexRecommendation
} from './common';

export interface ActivityDocument extends BaseDocument {
  /** 活动业务唯一 ID（可读） */
  activity_id: string;
  /** 活动名称 */
  name: string;
  /** 活动描述 */
  description: string;
  /** 活动开始时间（ISO 时间） */
  start_at: string;
  /** 活动结束时间（ISO 时间） */
  end_at: string;
  /** 后台活动状态 */
  status: ActivityStatusValue;
  /** 活动页面规则文案 */
  rules_text: string;
}

export const ACTIVITY_FIELD_DOCS: FieldDoc<ActivityDocument> = {
  _id: '数据库文档 ID，由数据库自动生成。',
  activity_id: '活动业务主键，接口与跨集合关联均使用此字段。',
  name: '活动名称，用于前台与管理台展示。',
  description: '活动说明文本。',
  start_at: '活动开始时间（ISO 8601）。',
  end_at: '活动结束时间（ISO 8601）。',
  status: '后台状态：draft/online/offline/ended。',
  rules_text: '前端展示的抽奖规则与说明。',
  created_at: '创建时间（ISO 8601）。',
  updated_at: '更新时间（ISO 8601）。'
};

export const ACTIVITY_INDEXES: ReadonlyArray<IndexRecommendation> = [
  {
    collection: 'activities',
    name: 'uk_activity_id',
    fields: ['activity_id'],
    unique: true,
    reason: '按 activity_id 精确查询活动配置，且保证活动 ID 唯一。'
  },
  {
    collection: 'activities',
    name: 'idx_status_time',
    fields: ['status', 'start_at', 'end_at'],
    reason: '管理端按状态与时间窗口筛选活动。'
  }
];
