import type {
  ActivityStatusValue,
  CollectionName,
  PrizeTypeValue
} from '../domain/models/common';
import type { ActivityDocument } from '../domain/models/activities';
import type { PrizeDocument } from '../domain/models/prizes';
import type { OrderCredentialDocument } from '../domain/models/order-credentials';

interface SeedData {
  activities: ActivityDocument[];
  prizes: PrizeDocument[];
  order_credentials: OrderCredentialDocument[];
}

export interface SeedAdapter {
  insertMany<T>(collection: CollectionName, docs: T[]): Promise<void>;
}

const SEED_SECRET = 'lottery-mvp-seed-secret';

function hashLike(input: string): string {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 131 + input.charCodeAt(index)) >>> 0;
  }
  return hash.toString(16).padStart(8, '0');
}

function buildUserKey(activityId: string, orderNo: string, mobileTail4?: string): string {
  const raw = `${activityId}:${orderNo}:${mobileTail4 ?? ''}:${SEED_SECRET}`;
  const userKey = `uk_${hashLike(raw)}`;

  if (userKey === orderNo) {
    throw new Error('user_key 不能直接等于 order_no');
  }

  return userKey;
}

const now = '2026-03-27T00:00:00.000Z';
const activityId = 'act_mvp_202603';
const activityOnlineStatus: ActivityStatusValue = 'online';
const prizeTypeRetry: PrizeTypeValue = 'retry';
const prizeTypeDiscountCoupon: PrizeTypeValue = 'discount_coupon';
const prizeTypePhysicalGift: PrizeTypeValue = 'physical_gift';
const prizeTypeNone: PrizeTypeValue = 'none';

export const seedExampleData: SeedData = {
  activities: [
    {
      activity_id: activityId,
      name: 'MVP 测试活动',
      description: '用于联调 verify-order / draw / my-prize 的测试活动',
      start_at: '2026-03-01T00:00:00.000Z',
      end_at: '2026-12-31T23:59:59.000Z',
      status: activityOnlineStatus,
      rules_text: '每个合法订单默认 3 次抽奖机会。',
      created_at: now,
      updated_at: now
    }
  ],
  prizes: [
    {
      prize_id: 'prize_retry_001',
      activity_id: activityId,
      title: '再来一次',
      prize_type: prizeTypeRetry,
      weight: 3500,
      stock_total: 999999,
      stock_issued: 0,
      sort_order: 1,
      is_enabled: true,
      created_at: now,
      updated_at: now
    },
    {
      prize_id: 'prize_coupon_010',
      activity_id: activityId,
      title: '9 折优惠券',
      prize_type: prizeTypeDiscountCoupon,
      weight: 1200,
      stock_total: 2000,
      stock_issued: 0,
      sort_order: 2,
      is_enabled: true,
      created_at: now,
      updated_at: now
    },
    {
      prize_id: 'prize_gift_020',
      activity_id: activityId,
      title: '联名马克杯',
      prize_type: prizeTypePhysicalGift,
      weight: 80,
      stock_total: 100,
      stock_issued: 0,
      sort_order: 3,
      is_enabled: true,
      created_at: now,
      updated_at: now
    },
    {
      prize_id: 'prize_none_999',
      activity_id: activityId,
      title: '谢谢参与',
      prize_type: prizeTypeNone,
      weight: 5220,
      stock_total: 999999,
      stock_issued: 0,
      sort_order: 4,
      is_enabled: true,
      created_at: now,
      updated_at: now
    }
  ],
  order_credentials: [
    {
      activity_id: activityId,
      order_no: 'ORD-202603-0001',
      mobile_tail4: '1024',
      purchase_channel: 'mini-program',
      product_code: 'SKU-MVP-A',
      is_claimed: true,
      claimed_user_key: buildUserKey(activityId, 'ORD-202603-0001', '1024'),
      claimed_at: now,
      created_at: now,
      updated_at: now
    },
    {
      activity_id: activityId,
      order_no: 'ORD-202603-0002',
      mobile_tail4: '2048',
      purchase_channel: 'h5',
      product_code: 'SKU-MVP-A',
      is_claimed: false,
      created_at: now,
      updated_at: now
    },
    {
      activity_id: activityId,
      order_no: 'ORD-202603-0003',
      mobile_tail4: '4096',
      purchase_channel: 'pc',
      product_code: 'SKU-MVP-B',
      is_claimed: false,
      created_at: now,
      updated_at: now
    },
    {
      activity_id: activityId,
      order_no: 'ORD-202603-0004',
      mobile_tail4: '8192',
      purchase_channel: 'h5',
      product_code: 'SKU-MVP-C',
      is_claimed: true,
      claimed_user_key: buildUserKey(activityId, 'ORD-202603-0004', '8192'),
      claimed_at: now,
      created_at: now,
      updated_at: now
    }
  ]
};

export async function seedMvpCollections(adapter: SeedAdapter): Promise<void> {
  await adapter.insertMany('activities', seedExampleData.activities);
  await adapter.insertMany('prizes', seedExampleData.prizes);
  await adapter.insertMany('order_credentials', seedExampleData.order_credentials);
}
