# 正式版抽奖系统 MVP 不可变规范

> 本文档用于固化“正式版抽奖系统 MVP”的硬性规范。后续所有设计与实现必须以本文档为准，未经明确评审结论不得擅自改动。

## 1. 项目目标

- 面向购买用户的小型抽奖系统。
- 用户流程：先提交购买凭证完成资格校验，再进入抽奖流程。
- 终端范围：移动端 H5、PC 浏览器、轻量管理页。

## 2. 技术栈（不可变）

### 2.1 前端

- Vue 3
- TypeScript
- Vite
- Pinia
- Vue Router

### 2.2 后端

- Tencent CloudBase
- 单一 `api` 云函数入口
- TypeScript

## 3. 项目结构（目录约束）

仓库必须采用以下目录结构：

- `apps/web`
- `cloudfunctions/api`
- `packages/shared`
- `scripts`
- `docs`

## 4. 业务范围（MVP 边界）

- 单活动 MVP。
- 奖项类型固定且仅允许：
  - `retry`
  - `discount_coupon`
  - `physical_gift`
  - `none`
- 需提供轻量管理页。
- 需具备基础防刷能力。
- 不接微信 OAuth。
- 不做复杂后台权限系统。
- 不做原生 iOS / Android App。

## 5. 用户身份与资格方案

### 5.1 身份路径

- 必须采用“订单凭证路线”。
- 明确不采用设备指纹作为主身份方案。
- 明确不采用手机号验证码作为主身份方案。

### 5.2 订单凭证字段

用户参与前，必须提交订单凭证进行校验。订单凭证至少包含：

- `activity_id`
- `order_no`

可选增强校验字段：

- `mobile_tail4`
- `purchase_channel`
- `product_code`

### 5.3 user_key 生成规则

- 服务端校验通过后生成内部 `user_key`。
- `user_key` 不能直接等于 `order_no`。
- 建议内部生成原则：

```text
user_key = hash(activity_id + order_no + verify_fields + server_secret)
```

- 后续抽奖、次数、券码、记录均只认内部 `user_key`。

## 6. 认证与安全

### 6.1 verify-order 响应要求

`verify-order` 成功后，后端必须返回：

- `user_key`
- `auth_token`
- `token_expire_at`

### 6.2 令牌校验范围

以下接口必须校验 `auth_token`：

- `draw`
- `my-prize`
- `my-chances`
- `claim-physical-gift`

并且不允许仅凭 `user_key` 调用 `draw`。

### 6.3 抽奖安全约束

- 每次抽奖必须携带 `request_id`。
- 前端不能使用随机数决定中奖结果。
- 判奖必须在后端完成。
- 库存必须由后端控制。

### 6.4 基础防刷能力

必须包含：

- `request_id` 幂等
- `user_key` 频率限制
- IP 频率限制
- `device_fingerprint` 记录

说明：`device_fingerprint` 仅可作为辅助风控信息，不可作为主身份标识。

## 7. 抽奖核心规则

抽奖流程必须严格遵循：

1. 抽奖前校验：
   - 参数合法性
   - `auth_token`
   - `request_id` 幂等
   - 活动状态
   - 用户剩余次数
2. 读取有效奖池。
3. 使用“整数权重法”在后端判奖（禁止前端浮点随机判奖）。
4. 库存不足时不得超发。
5. 中奖记录必须落库。
6. 若奖项类型为 `discount_coupon`，必须生成唯一 `coupon_code`。

## 8. 数据库集合（最小集合）

至少包含以下集合：

- `activities`
- `prizes`
- `order_credentials`
- `user_profiles`
- `user_chances`
- `draw_records`
- `coupon_codes`
- `physical_gift_claims`
- `request_locks`

## 9. 关键接口清单

### 9.1 前台接口

- `POST /api/auth/verify-order`
- `POST /api/auth/refresh-token`
- `GET /api/activity/config`
- `POST /api/lottery/draw`
- `GET /api/lottery/my-prize`
- `GET /api/lottery/my-chances`
- `POST /api/lottery/claim-physical-gift`

### 9.2 管理端接口

- `GET /api/admin/activity/overview`
- `GET /api/admin/prizes`
- `GET /api/admin/draw-records`
- `GET /api/admin/coupons`
- `POST /api/admin/activity/status`
- `POST /api/admin/prize/update`

## 10. 统一响应结构（强制）

所有接口统一返回：

```ts
{
  code: number,
  message: string,
  data?: T,
  trace_id?: string,
  server_time: string
}
```

## 11. 错误码规范（强制分段）

- Common: `1000-1099`
- Activity: `2001-2099`
- Auth: `3001-3099`
- Lottery: `4001-4099`
- Coupon: `5001-5099`
- Gift: `6001-6099`

## 12. 代码分层约束

### 12.1 后端分层

后端必须分层为：

- `routes`
- `controllers`
- `validators`
- `services`
- `repositories`
- `domain`
- `utils`

### 12.2 前端分层

前端必须分层为：

- `views`
- `components`
- `api`
- `stores`
- `composables`
- `modules`

## 13. 禁止事项（红线）

- 不得将 `order_no` 直接当作 `user_key`。
- 不得让前端决定中奖结果。
- 不得在 `controller` 中直接编写数据库业务逻辑。
- 不得在 `repository` 中编写判奖逻辑。
- 不得返回不统一的响应格式。
- 不得擅自增加未讨论的登录体系。
- 不得擅自改动奖项类型枚举。

## 14. 变更治理

- 本文档为当前阶段不可变规范基线。
- 任何偏离必须先经需求与技术评审确认，并在本文档中显式记录变更。
- 未记录即视为未获批准。
