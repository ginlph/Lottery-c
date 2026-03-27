import type { BaseDocument, FieldDoc, IndexRecommendation } from './common';

export interface UserProfileDocument extends BaseDocument {
  /** 活动 ID */
  activity_id: string;
  /** 内部用户标识，不能直接等于 order_no */
  user_key: string;
  /** 绑定订单号 */
  order_no: string;
  /** 可选：设备指纹（仅风控） */
  device_fingerprint?: string;
  /** 可选：最近访问 IP */
  last_ip?: string;
  /** 当前有效 auth token */
  auth_token: string;
  /** token 过期时间 */
  token_expire_at: string;
}

export const USER_PROFILE_FIELD_DOCS: FieldDoc<UserProfileDocument> = {
  _id: '数据库文档 ID，由数据库自动生成。',
  activity_id: '活动 ID。',
  user_key: '内部用户标识，来自服务端规则生成。',
  order_no: '绑定的订单号（仅追溯，不用于抽奖身份）。',
  device_fingerprint: '设备指纹，仅用于风控辅助。',
  last_ip: '最近访问 IP，用于频率限制与风控。',
  auth_token: '当前生效的认证令牌。',
  token_expire_at: '认证令牌过期时间（ISO 8601）。',
  created_at: '创建时间（ISO 8601）。',
  updated_at: '更新时间（ISO 8601）。'
};

export const USER_PROFILE_INDEXES: ReadonlyArray<IndexRecommendation> = [
  {
    collection: 'user_profiles',
    name: 'uk_activity_user_key',
    fields: ['activity_id', 'user_key'],
    unique: true,
    reason: '以 user_key 作为后续抽奖、次数、领奖的核心身份键。'
  },
  {
    collection: 'user_profiles',
    name: 'idx_activity_token',
    fields: ['activity_id', 'auth_token'],
    reason: '按 token 反查当前用户身份。'
  }
];
