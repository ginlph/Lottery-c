import type { ActivityDocument, PrizeDocument } from '../domain';

const nowIso = () => new Date().toISOString();

const activities = new Map<string, ActivityDocument>();
const prizes = new Map<string, PrizeDocument[]>();

function activityKey(activityId: string) {
  return activityId;
}

function sortPrizes(items: PrizeDocument[]) {
  return [...items].sort((a, b) => a.sort_order - b.sort_order);
}

function ensureSeedData() {
  if (activities.size > 0) return;

  const now = nowIso();
  const activityId = 'act_mvp_202603';

  const defaultActivity: ActivityDocument = {
    _id: activityId,
    activity_id: activityId,
    name: 'MVP 测试活动',
    description: '用于联调活动配置、订单校验与抽奖入口的测试活动。',
    start_at: '2026-03-01T00:00:00.000Z',
    end_at: '2026-12-31T23:59:59.000Z',
    status: 'online',
    rules_text: '每个已校验订单默认 3 次抽奖机会。',
    created_at: now,
    updated_at: now
  };

  const defaultPrizes: PrizeDocument[] = [
    {
      _id: 'prize_retry_001',
      prize_id: 'prize_retry_001',
      activity_id: activityId,
      title: '再来一次',
      prize_type: 'retry',
      weight: 3500,
      stock_total: 999999,
      stock_issued: 0,
      sort_order: 1,
      is_enabled: true,
      created_at: now,
      updated_at: now
    },
    {
      _id: 'prize_coupon_010',
      prize_id: 'prize_coupon_010',
      activity_id: activityId,
      title: '9 折优惠券',
      prize_type: 'discount_coupon',
      weight: 1200,
      stock_total: 2000,
      stock_issued: 0,
      sort_order: 2,
      is_enabled: true,
      created_at: now,
      updated_at: now
    },
    {
      _id: 'prize_gift_020',
      prize_id: 'prize_gift_020',
      activity_id: activityId,
      title: '联名马克杯',
      prize_type: 'physical_gift',
      weight: 80,
      stock_total: 100,
      stock_issued: 0,
      sort_order: 3,
      is_enabled: true,
      created_at: now,
      updated_at: now
    },
    {
      _id: 'prize_none_999',
      prize_id: 'prize_none_999',
      activity_id: activityId,
      title: '谢谢参与',
      prize_type: 'none',
      weight: 5220,
      stock_total: 999999,
      stock_issued: 0,
      sort_order: 4,
      is_enabled: true,
      created_at: now,
      updated_at: now
    }
  ];

  activities.set(activityKey(defaultActivity.activity_id), defaultActivity);
  prizes.set(activityKey(defaultActivity.activity_id), defaultPrizes);
}

export const activityRepository = {
  seedActivity(doc: ActivityDocument) {
    activities.set(activityKey(doc.activity_id), doc);
  },
  seedPrizes(activityId: string, docs: PrizeDocument[]) {
    prizes.set(activityKey(activityId), sortPrizes(docs));
  },
  async getActivityByActivityId(activityId: string) {
    ensureSeedData();
    return activities.get(activityKey(activityId));
  },
  async listEffectivePrizes(activityId: string) {
    ensureSeedData();
    const docs = prizes.get(activityKey(activityId)) ?? [];
    return sortPrizes(docs.filter((item) => item.is_enabled));
  }
};
