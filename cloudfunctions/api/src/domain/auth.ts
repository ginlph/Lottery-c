export interface VerifyFieldsInput {
  mobile_tail4?: string;
  purchase_channel?: string;
  product_code?: string;
}

export interface AuthTokenPayload {
  activity_id: string;
  user_key: string;
  iat: number;
  exp: number;
}

export interface TokenIssueResult {
  auth_token: string;
  token_expire_at: string;
}
