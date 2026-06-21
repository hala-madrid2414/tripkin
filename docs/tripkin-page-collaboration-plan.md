# TripKin 页面协作任务清单

本文档记录公共骨架完成后的页面协作任务。任务负责人先使用角色占位，团队可在飞书或任务看板中替换为真实姓名。

本文档只记录已确认、便于协作的事项。不确定的远期能力继续留在飞书或 `.local-docs/`，不写入正式范围。

## 当前公共骨架状态

已完成：

- `/` 首页轻量入口。
- `/mbti`、`/mbti/test`、`/mbti/result` 三段式 MBTI 路由。
- `首页 / 地图 / 匹配 / 我的` 四栏 `BottomNav`。
- `MbtiEntryModal` 页面内 MBTI 引导弹窗，可被 Home、Profile 或必要的 MBTI CTA 使用。
- MBTI 不再作为 BottomNav tab，Match 是底部主导航核心入口。

后续页面负责人默认不改公共骨架。确实需要改 `src/router`、`src/components/BottomNav` 或 `src/components/MbtiEntryModal` 时，先说明影响范围。

## 任务清单

### 公共骨架负责人

- 负责范围：`src/router`、`src/components/BottomNav`、`src/components/MbtiEntryModal`、`src/pages/Home` 的轻量入口壳。
- 当前状态：公共骨架已搭好，后续只做必要维护。
- 可继续做：修复公共入口 bug，处理路由冲突，维护底部导航和页面内 MBTI 入口一致性。
- 影响边界：会影响所有页面。非必要不要夹带单页视觉重写。

### 首页负责人

- 负责范围：`src/pages/Home/`。
- 目标：补齐首页内容，让它承担常规入口、旅行探索入口和页面内 MBTI 引导入口。
- 可做事项：完善首页首屏、推荐卡片、地图入口、已有 MBTI 结果摘要。
- 影响边界：不修改 `BottomNav` 和路由总表；如需要调整 MBTI 引导弹窗行为，先说明影响范围。

### MBTI 负责人

- 负责范围：`src/pages/Mbti/`。
- 目标：完善 `/mbti -> /mbti/test -> /mbti/result` 三段式体验。
- 可做事项：优化 MBTI 首页、测试页、结果页、重新测试、结果详情和旅行身份卡展示。
- 影响边界：复用现有题目和计分逻辑，不重写算法；不把 MBTI 弹窗写成独立路由。

### Map 负责人

- 负责范围：`src/pages/Map/`。
- 目标：继续作为 Demo 主枢纽，承接目的地探索并分发到 Bottle 和 Match。
- 可做事项：优化地图入口、搜索、图层、选区卡片、去 Bottle/Match 的目的地跳转。
- 影响边界：不修改 `BottomNav` 和 `MbtiEntryModal`；如地图内需要 MBTI 快捷入口，先确认是否属于页面内 CTA。

### Bottle 负责人

- 负责范围：`src/pages/Bottle/`，必要时 `src/services/bottleService.ts`。
- 目标：完善同目的地漂流瓶列表、详情、添加和跳转 Match。
- 可做事项：优化列表空态、详情弹层、添加漂流瓶表单、目的地文案和反馈。
- 影响边界：不修改路由总表；不新增真实图片上传、数据库或真实后端能力。

### Match 负责人

- 负责范围：`src/pages/Match/`，必要时 `src/services/matchService.ts`。
- 目标：完善同目的地搭子和行程匹配体验。
- 可做事项：优化筛选、卡片、他人身份卡、加入行程弹层和空态。
- 影响边界：不修改全局导航；TripKin 旅行人格以 `personaId` 为准，不要把 `mbtiTypeEn` 当作 16 型 MBTI 字母。

### Profile 负责人

- 负责范围：`src/pages/Profile/`。
- 目标：完善“我的旅行身份”页面。
- 可做事项：优化旅行身份卡、MBTI 结果摘要、目的地倾向、漂流瓶和搭子摘要入口。
- 影响边界：不修改共享 store 结构；设置入口后置，不作为首屏主体。

## 冲突控制

- 每个人优先只改自己负责的 `src/pages/<PageName>/` 目录。
- 页面私有组件继续放在页面目录内，确认跨页复用后再抽到 `src/components`。
- 需要改公共组件、路由、全局样式变量或共享 store 时，先说明影响范围。
- 不确定需求先写到飞书或 `.local-docs/`，不要直接写进正式文档或代码。

## 验收方式

每轮提交前至少运行：

```bash
npm run lint
npm run build
```

如果修改了 Markdown 或格式相关内容，也运行：

```bash
npm run format:check
```

人工 375px 走查至少覆盖：

- `/`
- `/mbti`
- `/mbti/test`
- `/mbti/result`
- `/map`
- `/bottle`
- `/match`
- `/profile`
