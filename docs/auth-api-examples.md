# Auth 接口示例（订单校验与令牌刷新）

## 1) POST /api/auth/verify-order

### 请求示例

```http
POST /api/auth/verify-order
Content-Type: application/json

{
  "activity_id": "act_2026_spring",
  "order_no": "ORD202603270001",
  "mobile_tail4": "1234",
  "purchase_channel": "JD",
  "product_code": "SKU-ABC",
  "device_fingerprint": "fp_7df8f89f"
}
```

### 成功响应示例

```json
{
  "code": 1000,
  "message": "ok",
  "data": {
    "user_key": "7f4f77df5c4a3fd8fdbb2f23f00b7f2ff0cbf3a66d9a4f9de8ca2f8b8ff0c8d1",
    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_expire_at": "2026-03-28T09:00:00.000Z",
    "total_chances": 3,
    "used_chances": 0,
    "remaining_chances": 3
  },
  "trace_id": "trace-001",
  "server_time": "2026-03-27T09:00:00.000Z"
}
```

## 2) POST /api/auth/refresh-token

### 请求示例

```http
POST /api/auth/refresh-token
Content-Type: application/json

{
  "activity_id": "act_2026_spring",
  "user_key": "7f4f77df5c4a3fd8fdbb2f23f00b7f2ff0cbf3a66d9a4f9de8ca2f8b8ff0c8d1",
  "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 成功响应示例

```json
{
  "code": 1000,
  "message": "ok",
  "data": {
    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.NEW...",
    "token_expire_at": "2026-03-28T10:00:00.000Z"
  },
  "trace_id": "trace-002",
  "server_time": "2026-03-27T10:00:00.000Z"
}
```

## 错误路径示例

### activity_id 无效

```json
{
  "code": 3003,
  "message": "activity_id is invalid"
}
```

### 订单凭证不存在

```json
{
  "code": 3004,
  "message": "order credential does not exist"
}
```

### 订单凭证已被领取（明确错误码）

```json
{
  "code": 3005,
  "message": "order credential already claimed"
}
```

### refresh-token 令牌非法或过期

```json
{
  "code": 3001,
  "message": "auth_token is invalid or expired"
}
```
