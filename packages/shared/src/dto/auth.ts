/**
 * 订单凭证校验请求
 */
export interface VerifyOrderRequest {
  /** 活动 ID */
  activity_id: string;
  /** 订单号 */
  order_no: string;
  /** 手机号后四位（可选增强校验） */
  mobile_tail4?: string;
  /** 购买渠道（可选增强校验） */
  purchase_channel?: string;
  /** 商品编码（可选增强校验） */
  product_code?: string;
  /** 设备指纹（仅作为风控辅助信息） */
  device_fingerprint?: string;
}

/**
 * 订单凭证校验响应
 */
export interface VerifyOrderResponse {
  /** 内部用户标识（不可等于订单号） */
  user_key: string;
  /** 鉴权令牌（后续受保护接口必传） */
  auth_token: string;
  /** 令牌过期时间（ISO 8601） */
  token_expire_at: string;
}

/**
 * 刷新令牌请求
 */
export interface RefreshTokenRequest {
  /** 活动 ID */
  activity_id: string;
  /** 内部用户标识 */
  user_key: string;
  /** 旧鉴权令牌 */
  auth_token: string;
}

/**
 * 刷新令牌响应
 */
export interface RefreshTokenResponse {
  /** 新鉴权令牌 */
  auth_token: string;
  /** 新令牌过期时间（ISO 8601） */
  token_expire_at: string;
}
