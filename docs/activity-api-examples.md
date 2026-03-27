# Activity 接口示例（活动配置与用户状态）

## GET /api/activity/config

> 页面打开时调用。接口返回活动配置 + 用户状态，并统一使用 `ApiResponse<T>`。

### 请求示例（未校验订单）

```http
GET /api/activity/config?activity_id=act_mvp_202603
```

### 响应示例（need_verify_order）

```json
{
  "code": 1000,
  "message": "ok",
  "data": {
    "activity_id": "act_mvp_202603",
    "activity_name": "MVP 测试活动",
    "activity_status": "online",
    "start_time": "2026-03-01T00:00:00.000Z",
    "end_time": "2026-12-31T23:59:59.000Z",
    "rule_text": "每个已校验订单默认 3 次抽奖机会。",
    "notice_text": "用于联调活动配置、订单校验与抽奖入口的测试活动。",
    "max_draw_per_user": 3,
    "prize_display": [
      {
        "prize_id": "prize_retry_001",
        "prize_type": "retry",
        "prize_name": "再来一次",
        "prize_desc": "再来一次",
        "sort_order": 1
      }
    ],
    "user_state": {
      "status": "need_verify_order",
      "verified": false,
      "total_chances": 0,
      "used_chances": 0,
      "remaining_chances": 0
    },
    "cover_config": {
      "title": "MVP 测试活动",
      "subtitle": "用于联调活动配置、订单校验与抽奖入口的测试活动。",
      "theme": "default",
      "banner_url": ""
    }
  },
  "trace_id": "trace-activity-001",
  "server_time": "2026-03-27T12:00:00.000Z"
}
```

### 请求示例（已校验订单）

```http
GET /api/activity/config?activity_id=act_mvp_202603
Authorization: Bearer <auth_token>
```

### 响应示例（verified）

```json
{
  "code": 1000,
  "message": "ok",
  "data": {
    "activity_id": "act_mvp_202603",
    "activity_name": "MVP 测试活动",
    "activity_status": "online",
    "start_time": "2026-03-01T00:00:00.000Z",
    "end_time": "2026-12-31T23:59:59.000Z",
    "rule_text": "每个已校验订单默认 3 次抽奖机会。",
    "notice_text": "用于联调活动配置、订单校验与抽奖入口的测试活动。",
    "max_draw_per_user": 3,
    "prize_display": [
      {
        "prize_id": "prize_coupon_010",
        "prize_type": "discount_coupon",
        "prize_name": "9 折优惠券",
        "prize_desc": "9 折优惠券",
        "sort_order": 2
      }
    ],
    "user_state": {
      "status": "verified",
      "verified": true,
      "user_key": "u_xxx",
      "total_chances": 3,
      "used_chances": 1,
      "remaining_chances": 2
    },
    "cover_config": {
      "title": "MVP 测试活动",
      "subtitle": "用于联调活动配置、订单校验与抽奖入口的测试活动。",
      "theme": "default",
      "banner_url": ""
    }
  },
  "trace_id": "trace-activity-002",
  "server_time": "2026-03-27T12:05:00.000Z"
}
```

## service 与 repository 调用关系

1. `getActivityConfigController`
   - 转发 `query` 与 `headers` 到 `activityService.getConfig`。
2. `activityService.getConfig`
   - 读取并校验 `activity_id`。
   - 调用 `activityRepository.getActivityByActivityId(activity_id)` 获取活动基础配置。
   - 调用 `activityRepository.listEffectivePrizes(activity_id)` 获取奖项展示列表（仅展示字段）。
   - 从 `Authorization` 解析 `auth_token`，调用 `verifyAuthToken` 进行令牌校验。
   - 校验通过后调用 `authRepository.getUserProfileByToken(activity_id, token)` 获取用户身份。
   - 若有用户身份，再调用 `authRepository.getUserChances(activity_id, user_key)` 获取次数信息。
   - 组装统一 `ApiResponse<T>.data`。
3. `handleApiRequest`
   - 使用 `success(data)` 包装为统一响应结构，附带 `trace_id` 与 `server_time`。

## 安全说明

- `prize_display` 仅返回前端展示信息，不返回 `weight`（真实概率控制参数）。
- `prize_display` 不返回 `stock_total / stock_issued`（库存字段）。
