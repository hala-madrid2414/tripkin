# 底部导航 Layout 迁移说明

本文档记录底部导航从“页面各自挂载”迁移为“应用 layout 统一控制”的下一步方案。

本次迁移属于公共骨架和协作规则变更。正式改代码前，应先确认相关页面负责人知道影响范围。

## 当前问题

当前 `BottomNav` 由页面自己 `import` 并渲染。这样会让底部导航规则分散在多个页面里，后续新增完整页面时容易误把导航带进去。

当前审计结论：

- 应保留底部导航的主 Tab：`/`、`/map`、`/match`、`/profile`。
- 当前不应带底部导航但已经挂了导航的完整页面：`/mbti`、`/mbti/test`、`/mbti/result`、`/bottle`。
- `Bottle` 和 `Mbti` 当前不在 `BottomNav` 四栏内，因此底栏不会有正确 active tab，也会干扰流程页和内容分支页。
- `Profile` 是主 Tab，但页面最大宽度是 `480px`，`BottomNav` 最大宽度是 `430px`，迁移时需要统一对齐。
- `Map` 的底部浮层依赖底栏高度，例如 `--bottom-nav-offset`，迁移时要保留主 Tab 的底栏让位逻辑。
- MBTI 和 Bottle 迁出底栏后，要移除为底栏预留的底部空白，例如 `92px`、`98px` 和 toast 的底栏偏移。

## 长期规则

底部导航只由应用 layout 决定是否显示。页面不直接 `import BottomNav`。

目录职责：

- `src/layouts/AppLayout/`：应用页面外壳，负责是否显示 `BottomNav`、主 Tab 安全区、底栏导航上下文。
- `src/router`：只负责路由表，决定哪个 path 渲染哪个 page。
- `src/components/BottomNav`：只保留四栏导航 UI 和链接，不判断自己是否显示。
- `src/pages`：只负责具体页面内容和页面内交互，不自行挂全局底栏。

底部主导航固定为：

```txt
首页 / 地图 / 匹配 / 我的
```

对应主 Tab 白名单：

```txt
/
/map
/match
/profile
```

不显示底部导航的完整页面包括：

- `/mbti`
- `/mbti/test`
- `/mbti/result`
- `/bottle`
- 后续详情页、编辑页、结果页、发布页、沉浸式流程页。

`/bottle` 是主链路中的目的地内容分支，但不是底栏一级入口。若未来要把 Bottle 改成底栏一级入口，必须先更新决策记录、PRD、整改范围和主 Tab 白名单。

## 迁移方案

后续代码迁移按以下顺序执行：

1. 新建 `src/layouts/AppLayout/index.tsx` 和 `src/layouts/AppLayout/AppLayout.module.less`。
2. 在 `App.tsx` 中用 `AppLayout` 包住 `AppRouter`。
3. `AppLayout` 使用 `useLocation()` 精确匹配主 Tab 白名单，只在 `/`、`/map`、`/match`、`/profile` 显示 `BottomNav`。
4. 从 Home、Map、Match、Profile、Mbti、Bottle 页面移除 `BottomNav` import 和页面内渲染。
5. Home、Map、Match、Profile 保留底栏安全距离，确保内容和 fixed 浮层不被底栏遮挡。
6. Mbti 和 Bottle 移除底栏后，把页面底部 padding 调整为自然 safe-area，不保留底栏空洞。
7. Profile 页面最大宽度与底栏统一到 `430px`，避免桌面预览时底栏比页面窄。

## 导航上下文

`BottomNav` 当前会携带 `destinationId`，用于在主 Tab 之间保留目的地上下文。迁移到 `AppLayout` 后，不新增新的 store。

默认策略：

- 继续使用现有 `useTripStore.destination` 承接跨页面目的地。
- Map、Bottle、Match 解析出当前目的地后，应把当前目的地写回共享会话状态。
- `AppLayout` 从 `useTripStore.destination` 读取当前目的地，并通过 `resolveDestinationId` 转成 `BottomNav` 需要的 `destinationId`。
- 如果当前会话没有可识别目的地，`BottomNav` 不附加 `?dest=`。

这能保持现有 `BottomNav` API 稳定，同时避免新增只服务底栏的全局状态。

## 验收标准

代码迁移完成后，需要检查：

- `/`、`/map`、`/match`、`/profile` 有底部导航。
- `/mbti`、`/mbti/test`、`/mbti/result`、`/bottle` 没有底部导航。
- `/bottle` 页面底部没有原来为底栏预留的空洞。
- `/mbti` 三段页面底部没有原来为底栏预留的空洞。
- `/map` 底部卡片、toast、图层控件仍然避开底栏。
- `/profile` 页面宽度和底栏宽度对齐。
- 从 Map 选中目的地进入 Match/Profile 时，底栏链接仍能携带可识别的目的地上下文。

## 文档同步要求

修改本迁移涉及源码时，必须同步检查：

- `README.md`
- `docs/coding-guide.md`
- `docs/collaboration-guide.md`
- `docs/tripkin-product-prd.md`
- `docs/tripkin-demo-fix-scope.md`
- `docs/tripkin-page-collaboration-plan.md`
- `docs/decision-notes/README.md`

纯文档修改不要求运行 `npm run lint` 和 `npm run build`。如果只改 Markdown，按需运行：

```bash
npm run format:check
```
