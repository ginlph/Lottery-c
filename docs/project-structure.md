# Project Structure

## 完整目录树（当前骨架）

```text
.
├── .env.example
├── .eslintrc.cjs
├── .gitignore
├── .prettierrc.json
├── README.md
├── apps
│   └── web
│       ├── index.html
│       ├── package.json
│       ├── src
│       │   ├── App.vue
│       │   ├── api
│       │   │   └── .gitkeep
│       │   ├── components
│       │   │   └── .gitkeep
│       │   ├── composables
│       │   │   └── .gitkeep
│       │   ├── env.d.ts
│       │   ├── main.ts
│       │   ├── modules
│       │   │   └── .gitkeep
│       │   ├── router
│       │   │   └── index.ts
│       │   ├── stores
│       │   │   └── app.ts
│       │   └── views
│       │       └── HomeView.vue
│       ├── tsconfig.json
│       └── vite.config.ts
├── cloudfunctions
│   └── api
│       ├── package.json
│       ├── src
│       │   ├── controllers
│       │   │   └── index.ts
│       │   ├── domain
│       │   │   └── index.ts
│       │   ├── index.ts
│       │   ├── repositories
│       │   │   └── index.ts
│       │   ├── routes
│       │   │   └── index.ts
│       │   ├── services
│       │   │   └── index.ts
│       │   ├── utils
│       │   │   └── index.ts
│       │   └── validators
│       │       └── index.ts
│       └── tsconfig.json
├── docs
│   ├── project-structure.md
│   └── system-spec.md
├── package.json
├── packages
│   └── shared
│       ├── package.json
│       ├── src
│       │   └── index.ts
│       └── tsconfig.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── scripts
│   └── README.md
└── tsconfig.base.json
```

## 包职责

- `apps/web`：H5 / PC 前端壳工程，负责页面路由、状态管理、UI 组织。
- `cloudfunctions/api`：统一后端入口，按 `routes/controllers/validators/services/repositories/domain/utils` 分层。
- `packages/shared`：沉淀统一响应结构、奖项枚举等共享类型。
- `scripts`：留作部署/检查脚本扩展。
- `docs`：规范、结构说明、后续设计文档沉淀。
