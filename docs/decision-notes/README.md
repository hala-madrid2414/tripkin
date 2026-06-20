# 决策记录

这里记录会影响多人协作、全局代码结构或后续开发理解的变更。

它不是审批流，也不是每次开发都要写的日报。普通页面内容修改不需要记录。

## 什么时候需要记录

需要记录：

- 新增或修改全局样式变量
- 新增依赖
- 引入组件库
- 修改路由结构
- 修改目录结构
- 修改工程化配置
- 抽跨页面公共组件

不需要记录：

- 页面内部样式
- 页面内部 mock 数据
- 页面内部小组件
- 文案调整
- 修自己页面里的 bug

## 记录模板

```md
### YYYY-MM-DD 变更标题

- 类型：全局样式 / 依赖 / 公共组件 / 路由 / 工程化 / 其他
- 背景：为什么需要这个变更
- 决定：最终采用什么方案
- 影响范围：会影响哪些目录、页面或协作规则
- 后续注意：开发时需要注意什么
```

## 已记录决策

### 2026-06-20 引入 server 最小 TypeScript mock API 骨架

- 类型：目录结构 / 依赖 / 工程化
- 背景：前端已通过 `src/services` 收口 Match 和 Bottle 的 mock 数据入口，后续需要一个最小后端承接前后端联调，但当前仍不能引入数据库、登录、真实 AI 或真实匹配算法。
- 决定：新增 `server/` 作为独立 TypeScript Express 后端目录，使用独立 `package.json` 和 `tsconfig.json`。当前仅提供 `/api/health` 健康检查，返回 `{ ok: true, service: 'tripkin-server' }`，用于确认后端服务可以启动和访问。
- 影响范围：`server/` 后端目录、README 本地启动说明、`AGENTS.md` 当前范围、`docs/coding-guide.md` 目录职责和 `docs/collaboration-guide.md` 协作规则。
- 后续注意：前端页面仍通过 `src/services` 访问数据，不直接拼后端 URL。后续 Match/Bottle 业务接口迁移需要单独确认接口契约；不要在本阶段顺手加入数据库、登录、真实 AI、真实匹配算法、复杂 CI 或正式测试框架。

### 2026-06-20 新增 MVP 四入口底部导航 BottomNav

- 类型：公共组件 / 路由
- 背景：最新 MVP 方案确认一级入口为地图、匹配、漂流瓶、我的；旅行测试仅作为新用户或偏好更新入口，不再长期占用底部导航。
- 决定：在 `src/components/BottomNav` 新增跨页面底部导航组件，当前接入 `/map`、`/match`、`/bottle`、`/profile`，不接入 `/mbti`。
- 影响范围：主流程四个页面、移动端底部安全区、后续页面新增一级入口时的导航维护。
- 后续注意：不要为单个页面私自改公共导航结构；如新增或移除一级入口，需要同步更新本决策记录和相关页面验收。

### 2026-06-19 确认 TripKin 总体 PRD 作为当前产品范围依据

- 类型：其他
- 背景：团队已有静态页面和整改计划，但缺少一份上游产品总说明。只看整改计划时，团队成员和 AI 容易不知道 TripKin 的主链路、页面职责和不做范围。
- 决定：新增 `docs/tripkin-product-prd.md` 作为当前 TripKin Demo 的正式产品 PRD。该文档只写已确认范围，说明产品定位、主链路、页面职责、公共产品约定、验收基准和不做范围。后续整改计划以该 PRD 为产品依据。
- 影响范围：README 文档索引、`docs/tripkin-demo-fix-scope.md`、所有主页面后续需求理解，以及 AI 协作时的需求入口。
- 后续注意：未确认想法仍放在飞书或本地草稿中，不直接写入团队正式文档。PRD 不维护人员分工，不替代具体整改计划。

### 2026-06-17 确定移动端开发基准

- 类型：全局样式
- 背景：团队成员可能按不同手机宽度写页面，容易导致视觉和布局不统一。
- 决定：当前阶段以 `375px` 宽度作为设计和开发基准，页面宽度保持弹性，高度自然滚动。
- 影响范围：所有页面样式。
- 后续注意：不要把页面写死成 `width: 375px` 或固定高度画布。

### 2026-06-18 确认 antd-mobile 使用边界

- 类型：依赖 / 组件库
- 背景：当前 Demo 需要快速完成移动端弹窗、切换、反馈等基础交互，但不能让页面完全变成组件库默认视觉。
- 决定：允许在需要时使用 `antd-mobile`。优先使用其基础交互组件，页面核心视觉、卡片、标签和主按钮仍通过 CSS Modules 自定义。具体规范见 `docs/antd-mobile-usage-guide.md`。
- 影响范围：后续可能使用组件库的高交互移动页面，例如需要弹层、模式切换和操作反馈的页面。
- 后续注意：首次安装或升级 `antd-mobile` 时，需要同步更新依赖文件并运行 `npm run lint` 和 `npm run build`；除 `antd-mobile` 外，不要自行引入其他组件库。

### 2026-06-18 确认本地开发草稿区

- 类型：其他
- 背景：开发过程中会产生个人草稿、AI 对话总结、截图参考和分步计划；这些内容对个人推进有用，但在确认前不应进入正式仓库文档。
- 决定：使用 `.local-docs/` 作为个人开发草稿区，并加入 Git 忽略。该目录可以保存个人上下文和未确认拆解，但不作为团队正式需求、规范或决策依据。
- 影响范围：所有团队成员的本地开发流程，以及 AI 协作时的上下文保存方式。
- 后续注意：当 `.local-docs/` 中的内容已经确认会影响多人协作、公共规则或后续开发理解时，需要提炼后同步到正式 `docs/`，必要时记录决策。

### 2026-06-18 确认 TripKin 视觉 token 与 antd-mobile 变量覆盖

- 类型：全局样式
- 背景：后续页面会使用 `antd-mobile` 完成弹层、切换和反馈等基础交互，但项目视觉不能被组件库默认风格带偏。
- 决定：在 `src/styles/variables.less` 中建立 TripKin 全局视觉 token，并同步覆盖 `--adm-color-primary`、`--adm-color-success`、`--adm-color-text`、`--adm-color-weak`、`--adm-color-light`、`--adm-border-radius` 等 antd-mobile 基础 CSS 变量。
- 影响范围：`src/styles` 全局变量、后续使用 antd-mobile 的页面，以及需要消费项目颜色、圆角、阴影和表面层级的页面样式。
- 后续注意：页面核心视觉仍通过 CSS Modules 自定义，不要直接堆默认 antd-mobile 组件当最终视觉；旧路由占位页不是新视觉参考对象，只做构建和基础展示检查。

### 2026-06-18 确认参考图与页面内组件协作规则

- 类型：其他
- 背景：复杂页面开发中容易出现参考图还原强度不清、页面内复杂组件样式集中到根 `module.less`、以及移动端标准交互能力未被优先使用的问题。
- 决定：复杂页面内组件优先在页面目录下拆分，并配套 `index.tsx + ComponentName.module.less`；发现 `.local-docs/` 中有参考图时，AI 或协作者必须先确认是严格还原、风格参考还是指定部分参考；对移动端标准交互优先使用 antd-mobile，视觉由 CSS Modules 覆盖。
- 影响范围：`docs/coding-guide.md`、`docs/collaboration-guide.md`、`docs/antd-mobile-usage-guide.md`，以及后续有参考图或复杂页面内组件的开发任务。
- 后续注意：`.local-docs/` 仍不进入 Git；当其中的参考图或视觉结论被确认影响多人协作时，需要提炼到正式文档或本地执行计划，并写清楚还原范围、不可偏离项和可自由调整项。

### 2026-06-18 确认旅行地图真实地图接入方式

- 类型：其他
- 背景：`/map` 需要支持真实地图底图，同时保持当前 Demo 可运行和可截图。
- 决定：`/map` 使用高德 Web 端 JS API 作为真实地图来源，通过本地 `.env.local` 配置 `VITE_AMAP_KEY` 和 `VITE_AMAP_SECURITY_CODE`；未配置或加载失败时使用页面内静态 SVG 地图兜底。不新增地图 npm 依赖。
- 影响范围：`/map` 页面、本地开发环境配置、README 本地开发说明。
- 后续注意：不要把真实 Key 或安全密钥提交到仓库；地图上的 TripKin 悬浮控件和底部卡片仍由页面 CSS Modules 自定义。

### 2026-06-19 确认本地页面验证方式

- 类型：工程化 / 其他
- 背景：当前 Demo 需要本地打开页面、截图和检查交互，但暂不引入正式测试框架、CI 或 npm 测试脚本。
- 决定：允许按需使用 `webapp-testing` 做本地页面验证；Python 虚拟环境、临时 Playwright 脚本、截图和运行产物放在本地 `.venv/` 内，并将 `.venv/` 加入 Git 忽略。具体用法见 `docs/webapp-testing-guide.md`。
- 影响范围：`.gitignore`、`docs/collaboration-guide.md`、`docs/webapp-testing-guide.md`，以及需要本地重复验证页面的协作流程。
- 后续注意：`webapp-testing` 不替代 `npm run lint`、`npm run build` 或人工视觉走查；只有用户或任务明确提到测试、自动化验证或截图验证时才使用。不使用这套流程的成员不需要创建 `.venv/`；测试区和自动化产物都属于本地忽略内容。不要把个人 AI 目录里的 skill 复制进仓库；如果未来要提交长期复用的测试脚本，需要重新确认测试目录、依赖和协作边界。

### 2026-06-19 引入跨页面共享会话仓库 useTripStore.ts 与类型 types/mbti.ts

- 类型：目录结构 / 跨页面公共件（共享状态）
- 背景：MBTI 测评完成后，用户的人格结果、目的地等信息需要在后续页面（Map / Match）继续消费。之前这些信息没有统一存放处，仅靠 URL 参数或页面内 `useState` 传递，无法跨页面复用。zustand 已是项目既有技术栈（`src/store` 是 `docs/coding-guide.md` 约定的共享状态目录），因此本次不新增依赖，仅在该目录下建立首个跨页面共享会话仓库。
- 决定：在 `src/store/useTripStore.ts` 新建 Zustand 仓库 `useTripStore`，状态形状定义在 `src/types/mbti.ts` 的 `TripSession` 接口中。仓库对外暴露两个 setter：`setMbtiResult(payload)` 在 MBTI 完成（或跳过）时写入完整会话；`setDestination(destination)` 在进入 `/mbti` 时由 URL `?dest=` 触发写入。会话字段包括：`personaId`、`mbtiTypeCn/mbtiTypeEn`、`tagline`、`tags`、`nickname`、`destination`、`avatarKey`、`accent`、`socialIntent`、`moduleStatus`、`skipped`、`rawScores`。
- 影响范围：`src/store/useTripStore.ts`、`src/types/mbti.ts`，以及 `src/pages/Mbti/`（写入方 `index.tsx`、读取方 `components/IdentityCard.tsx`）。本次合并后 Map、Match、Bottle 三个页面均为占位 stub，**尚未接入该仓库**——即「仓库目前仅由 MBTI 页写入，暂无外部运行时读者」。后续 Map / Match 接入仓库时需遵守本仓库的写/读约定。
- 后续注意：
  1. **字段语义陷阱（务必告知接入方）**：`TripSession.mbtiTypeEn` 存的是「人格标题」而非「MBTI 字母代码」。实际取值为 `CYBER-RAIDER` / `ZEN-CAPYBARA` / `BUDGET-ARCHITECT` / `ROMANTIC-OBSERVER`（来自 `data.ts` 的 `persona.titleEn`），写入点在 `pages/Mbti/index.tsx`。而 Match 页 `matchMock.ts` 里的 `mbti` 字段是真正的 16 类 MBTI 字母代码（`ENFP` / `INTJ` / `INFP` / `INTP`）。两套词表完全不相交，字段名不同（`mbtiTypeEn` vs `mbti`）、类型均为裸 `string`，TypeScript 不会拦截。未来 Match 接入仓库时，**禁止**将 `mbtiTypeEn` 与 Match 卡片的 `mbti` 直接做相等比较或匹配；人格匹配应使用类型安全的 `personaId: PersonaId`。
  2. **冗余字段**：`TripSession.avatarKey` 与 `personaId` 当前永远取相同值（`avatarKey: personaId`）。在确认是否需要「自定义头像覆盖」能力前，接入方应将两者视为同源派生；如计划支持自定义头像，需在本决策记录补充说明，否则建议后续合并为单一字段。
  3. **文档承诺 vs 现状**：`useTripStore.ts` 与 `types/mbti.ts` 的注释声称 Map 读 `destination`、Match 读 `personaId` 做匹配，但这属于文档约定，当前尚未落地为运行时集成。Match 当前 100% 由 `matchMock.ts` 驱动，未导入本仓库或 `@/types/mbti`；接入工作需另行排期并在落地时更新本决策。
  4. zustand 不是新依赖（项目已在用），本次新增不触发「新增依赖」决策项；触发项是跨页面共享状态目录与协作影响。

### 2026-06-19 确认 TripKin 静态 Demo 统一整改范围

- 类型：路由 / 共享状态 / 全局样式 / 公共组件 / 其他
- 背景：当前 `/mbti`、`/map`、`/bottle`、`/match`、`/profile` 已有静态页面，但页面之间的跳转、目的地上下文、身份体系和视觉规则尚未统一，容易出现“多个独立页面拼在一起”的协作问题。团队需要一份正式文档确认本轮先做什么、后做什么、做到什么算过。
- 决定：新增 `docs/tripkin-demo-fix-scope.md` 作为本轮静态 Demo 统一整改范围。主链路确认为 `MBTI -> 旅行身份卡 -> Map -> Bottle / Match -> Profile`。整改顺序为：先修跳转和目的地上下文，再补页面内部交互，最后统一视觉和状态表达。`/map` 和 `/match` 暂作为结构与信息密度参考，但不要求其他页面硬套全部视觉细节。
- 影响范围：所有主页面目录（`src/pages/Mbti`、`src/pages/Map`、`src/pages/Bottle`、`src/pages/Match`、`src/pages/Profile`）、跨页面共享状态（`src/store/useTripStore.ts`）、共享类型（`src/types/mbti.ts`）、后续可能确认复用的公共组件（例如身份卡、标签、底部弹层）以及 375px 移动端验收流程。
- 后续注意：
  1. 首轮目的地上下文优先使用 URL query 或现有 Zustand store 承接，推荐路由格式为 `/bottle?dest=<目的地ID>` 和 `/match?dest=<目的地ID>`。
  2. 首轮城市粒度只覆盖 `src/pages/Map/data/mapData.ts` 里已有的 region/spot，不额外扩展全量城市库。
  3. TripKin 旅行人格展示以 `personaId` 为准，不要把 `mbtiTypeEn` 当作 Match 卡片里的 16 型 MBTI 字母使用。
  4. 页面私有组件先留在各自页面目录；只有身份卡、标签、底部弹层等确认跨页复用后，再抽到 `src/components`。
  5. 本轮仍以静态前端 Demo 为主，仅允许 `server/` 下的最小 mock API 骨架用于后续联调；不引入数据库、登录、真实 AI、真实聊天、真实上传、真实匹配算法或新 UI 组件库。
