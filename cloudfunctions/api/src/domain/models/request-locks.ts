import type { BaseDocument, FieldDoc, IndexRecommendation } from './common';

export interface RequestLockDocument extends BaseDocument {
  /** 锁 ID（建议用业务前缀 + request_id） */
  lock_key: string;
  /** 幂等请求 ID */
  request_id: string;
  /** 活动 ID */
  activity_id: string;
  /** 内部用户标识 */
  user_key: string;
  /** 锁状态 */
  status: 'locked' | 'released';
  /** 锁过期时间（用于兜底自动过期） */
  expire_at: string;
  /** 最近一次释放时间 */
  released_at?: string;
}

export const REQUEST_LOCK_FIELD_DOCS: FieldDoc<RequestLockDocument> = {
  _id: '数据库文档 ID，由数据库自动生成。',
  lock_key: '锁主键，建议使用 draw:{activity_id}:{request_id}。',
  request_id: '抽奖请求 ID，用于幂等与重复请求拦截。',
  activity_id: '活动 ID。',
  user_key: '用户标识。',
  status: '锁状态：locked/released。',
  expire_at: '锁超时时间（ISO 8601）。',
  released_at: '锁释放时间（ISO 8601）。',
  created_at: '创建时间（ISO 8601）。',
  updated_at: '更新时间（ISO 8601）。'
};

export const REQUEST_LOCK_INDEXES: ReadonlyArray<IndexRecommendation> = [
  {
    collection: 'request_locks',
    name: 'uk_lock_key',
    fields: ['lock_key'],
    unique: true,
    reason: 'request_locks 作为幂等锁，lock_key 必须唯一。'
  },
  {
    collection: 'request_locks',
    name: 'idx_request_status',
    fields: ['request_id', 'status', 'expire_at'],
    reason: '根据 request_id 快速判重与判断锁状态。'
  },
  {
    collection: 'request_locks',
    name: 'idx_expire_at',
    fields: ['expire_at'],
    reason: '后台清理过期锁。'
  }
];
