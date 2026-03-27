# Lottery-c Monorepo Skeleton

基于 `docs/system-spec.md` 初始化的 MVP 项目骨架。

## 1. 目录结构

详见 [`docs/project-structure.md`](./docs/project-structure.md)。

## 2. 快速开始

> 建议使用 Node.js 20+ 与 pnpm 10+

```bash
pnpm install
```

### 启动前端开发

```bash
pnpm dev:web
```

### 全量检查

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## 3. 当前包职责

- `apps/web`: Vue 3 + Vite + TypeScript 前端工程，已接入 Vue Router、Pinia、ESLint、Prettier。
- `cloudfunctions/api`: TypeScript 云函数后端骨架，保持单一 `api` 入口。
- `packages/shared`: TypeScript 共享类型包。

## 4. 暂未实现的业务清单

- 订单凭证校验链路：`verify-order / refresh-token`
- 抽奖核心链路：库存控制、权重抽奖、幂等锁、中奖落库
- 用户中心：`my-prize / my-chances / claim-physical-gift`
- 管理端能力：活动概览、奖项管理、抽奖记录、券码查询
- 基础风控：`user_key` 限频、IP 限频、`device_fingerprint` 记录
- CloudBase 数据库集合与 repository 实现

## 5. 约束遵循说明

- 未新增第二个前端项目。
- 未拆分多个云函数入口，`cloudfunctions/api/src/index.ts` 为唯一入口。
- 当前仅提供工程骨架，不包含业务接口实现。
