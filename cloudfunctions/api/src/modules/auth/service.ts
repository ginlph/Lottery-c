import { ERROR_CODES } from '../../enums/error-codes';
import { authRepository } from '../../repositories';
import { issueAuthToken, verifyAuthToken } from '../../services';
import { AppError } from '../../utils/app-error';

const DEFAULT_USER_TOTAL_CHANCES = 3;
const DEFAULT_USER_KEY_SECRET = 'lottery-dev-user-key-secret';

function getRuntimeSecret(key: string, fallback: string): string {
  const maybeProcess = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process;
  return maybeProcess?.env?.[key] ?? fallback;
}

async function generateUserKey(params: {
  activityId: string;
  orderNo: string;
  mobileTail4?: string;
  purchaseChannel?: string;
  productCode?: string;
}) {
  const serverSecret = getRuntimeSecret('USER_KEY_SERVER_SECRET', DEFAULT_USER_KEY_SECRET);
  const source = [
    params.activityId,
    params.orderNo,
    params.mobileTail4 ?? '',
    params.purchaseChannel ?? '',
    params.productCode ?? '',
    serverSecret
  ].join('|');
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(source));
  return Array.from(new Uint8Array(digest))
    .map((item) => item.toString(16).padStart(2, '0'))
    .join('');
}

function getClientIp(headers: Record<string, string | undefined> | undefined): string | undefined {
  if (!headers) return undefined;
  return headers['x-forwarded-for'] ?? headers['X-Forwarded-For'] ?? headers['x-real-ip'];
}

export const authService = {
  async verifyOrder(payload: Record<string, unknown>, ctx?: { headers?: Record<string, string | undefined> }) {
    const activityId = String(payload.activity_id);
    const orderNo = String(payload.order_no);
    const mobileTail4 = payload.mobile_tail4 ? String(payload.mobile_tail4) : undefined;
    const purchaseChannel = payload.purchase_channel ? String(payload.purchase_channel) : undefined;
    const productCode = payload.product_code ? String(payload.product_code) : undefined;
    const deviceFingerprint = payload.device_fingerprint ? String(payload.device_fingerprint) : undefined;

    const activity = await authRepository.getActivityByActivityId(activityId);
    if (!activity) {
      throw new AppError(ERROR_CODES.AUTH_ACTIVITY_INVALID, 'activity_id is invalid', 400);
    }

    const credential = await authRepository.getOrderCredential(activityId, orderNo);
    if (!credential) {
      throw new AppError(ERROR_CODES.AUTH_ORDER_NOT_FOUND, 'order credential does not exist', 404);
    }

    if (credential.is_claimed && credential.claimed_user_key) {
      throw new AppError(ERROR_CODES.AUTH_ORDER_ALREADY_CLAIMED, 'order credential already claimed', 409, {
        claimed_user_key: credential.claimed_user_key
      });
    }

    const userKey = await generateUserKey({
      activityId,
      orderNo,
      mobileTail4,
      purchaseChannel,
      productCode
    });

    const token = await issueAuthToken(activityId, userKey);
    const userProfile = await authRepository.createOrUpdateUserProfileByOrder({
      activityId,
      orderNo,
      userKey,
      authToken: token.auth_token,
      tokenExpireAt: token.token_expire_at,
      deviceFingerprint,
      ip: getClientIp(ctx?.headers)
    });

    await authRepository.claimOrderCredential(activityId, orderNo, userKey);

    const chances = await authRepository.initUserChances(
      activityId,
      userProfile.user_key,
      DEFAULT_USER_TOTAL_CHANCES
    );

    return {
      user_key: userKey,
      auth_token: token.auth_token,
      token_expire_at: token.token_expire_at,
      total_chances: chances.total_chances,
      used_chances: chances.used_chances,
      remaining_chances: chances.remaining_chances
    };
  },
  async refreshToken(payload: Record<string, unknown>) {
    const activityId = String(payload.activity_id);
    const userKey = String(payload.user_key);
    const oldToken = String(payload.auth_token);

    const profile = await authRepository.getUserProfileByUserKey(activityId, userKey);
    if (!profile) {
      throw new AppError(ERROR_CODES.AUTH_INVALID_TOKEN, 'user identity does not exist', 401);
    }
    if (profile.auth_token !== oldToken) {
      throw new AppError(ERROR_CODES.AUTH_INVALID_TOKEN, 'auth_token mismatch', 401);
    }

    let tokenPayload;
    try {
      tokenPayload = await verifyAuthToken(oldToken);
    } catch {
      throw new AppError(ERROR_CODES.AUTH_INVALID_TOKEN, 'auth_token is invalid or expired', 401);
    }

    if (tokenPayload.activity_id !== activityId || tokenPayload.user_key !== userKey) {
      throw new AppError(ERROR_CODES.AUTH_IDENTITY_MISMATCH, 'token identity mismatch', 401);
    }

    const token = await issueAuthToken(activityId, userKey);
    await authRepository.createOrUpdateUserProfileByOrder({
      activityId,
      orderNo: profile.order_no,
      userKey,
      authToken: token.auth_token,
      tokenExpireAt: token.token_expire_at,
      deviceFingerprint: profile.device_fingerprint,
      ip: profile.last_ip
    });

    return token;
  }
};
