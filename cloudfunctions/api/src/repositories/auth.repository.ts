import type { ActivityDocument, OrderCredentialDocument, UserChanceDocument, UserProfileDocument } from '../domain';

const nowIso = () => new Date().toISOString();

const activities = new Map<string, ActivityDocument>();
const orderCredentials = new Map<string, OrderCredentialDocument>();
const userProfiles = new Map<string, UserProfileDocument>();
const userChances = new Map<string, UserChanceDocument>();

function activityKey(activityId: string) {
  return activityId;
}

function orderKey(activityId: string, orderNo: string) {
  return `${activityId}:${orderNo}`;
}

function userKey(activityId: string, userKeyValue: string) {
  return `${activityId}:${userKeyValue}`;
}

function chanceKey(activityId: string, userKeyValue: string) {
  return `${activityId}:${userKeyValue}`;
}

export const authRepository = {
  seedActivity(doc: ActivityDocument) {
    activities.set(activityKey(doc.activity_id), doc);
  },
  seedOrderCredential(doc: OrderCredentialDocument) {
    orderCredentials.set(orderKey(doc.activity_id, doc.order_no), doc);
  },
  async getActivityByActivityId(activityId: string) {
    return activities.get(activityKey(activityId));
  },
  async getOrderCredential(activityId: string, orderNo: string) {
    return orderCredentials.get(orderKey(activityId, orderNo));
  },
  async claimOrderCredential(activityId: string, orderNo: string, claimedUserKey: string) {
    const key = orderKey(activityId, orderNo);
    const doc = orderCredentials.get(key);
    if (!doc) return;
    orderCredentials.set(key, {
      ...doc,
      is_claimed: true,
      claimed_user_key: claimedUserKey,
      claimed_at: nowIso(),
      updated_at: nowIso()
    });
  },
  async createOrUpdateUserProfileByOrder(params: {
    activityId: string;
    orderNo: string;
    userKey: string;
    authToken: string;
    tokenExpireAt: string;
    deviceFingerprint?: string;
    ip?: string;
  }) {
    const key = userKey(params.activityId, params.userKey);
    const previous = userProfiles.get(key);
    const createdAt = previous?.created_at ?? nowIso();

    const next: UserProfileDocument = {
      _id: previous?._id ?? key,
      activity_id: params.activityId,
      user_key: params.userKey,
      order_no: params.orderNo,
      device_fingerprint: params.deviceFingerprint,
      last_ip: params.ip,
      auth_token: params.authToken,
      token_expire_at: params.tokenExpireAt,
      created_at: createdAt,
      updated_at: nowIso()
    };
    userProfiles.set(key, next);
    return next;
  },
  async initUserChances(activityId: string, userKeyValue: string, totalChances: number) {
    const key = chanceKey(activityId, userKeyValue);
    const existing = userChances.get(key);
    if (existing) return existing;

    const doc: UserChanceDocument = {
      _id: key,
      activity_id: activityId,
      user_key: userKeyValue,
      total_chances: totalChances,
      used_chances: 0,
      remaining_chances: totalChances,
      created_at: nowIso(),
      updated_at: nowIso()
    };
    userChances.set(key, doc);
    return doc;
  },
  async getUserChances(activityId: string, userKeyValue: string) {
    return userChances.get(chanceKey(activityId, userKeyValue));
  },
  async getUserProfileByUserKey(activityId: string, userKeyValue: string) {
    return userProfiles.get(userKey(activityId, userKeyValue));
  },
  async getUserProfileByToken(activityId: string, authToken: string) {
    const docs = Array.from(userProfiles.values());
    return docs.find((doc) => doc.activity_id === activityId && doc.auth_token === authToken);
  }
};
