# TripKin

TripKin 是一个移动端 H5 旅行搭子 Demo，目前用于比赛作品原型开发。

仓库文档只记录当前已经确认、会影响开发协作的事实。未确认的产品想法、分工和远期规划放在飞书讨论，不写成仓库规则。

## 当前目标

当前阶段先完成可运行、可截图、可继续迭代的前端 Demo，并允许 `server/` 下的最小 TypeScript mock API 链路用于后续前后端联调。

已确定的主流程页面包括：

- 首页：`/`
- 旅行 MBTI 首页：`/mbti`
- 旅行 MBTI 测试：`/mbti/test`
- 旅行 MBTI 结果：`/mbti/result`
- 旅行地图：`/map`
- 旅行漂流瓶：`/bottle`
- 搭子 / 行程匹配：`/match`
- 我的旅行身份：`/profile`

底部主导航入口只包括：

```txt
首页 / 地图 / 匹配 / 我的
```

对应路由为 `/`、`/map`、`/match`、`/profile`。MBTI 和 Bottle 属于主链路页面或内容分支，但不是底部主导航入口。

当前阶段暂不处理真实登录、数据库、真实匹配算法和真实 AI 接口。`server/` 只用于最小 mock API 链路，不代表真实后端能力完成。

## 环境要求

本项目需要本机已经安装 Node.js，并且可以使用 npm。

README 不从 nvm / Node.js / npm 开始教学。如果你还没有 Node.js 或 npm，请先看飞书教程，或找负责人处理本地环境。

## 本地开发

新拉代码后，先安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

如需启动最小后端 mock API：

```bash
cd server
npm install
npm run dev
```

后端默认运行在 `http://localhost:3001`，健康检查地址为 `http://localhost:3001/api/health`。

Match 和 Bottle 仍默认支持纯前端 demo。只有在前端 `.env.local` 中配置后端地址时，`src/services` 才会请求本地 mock API：

```bash
VITE_API_BASE_URL=http://localhost:3001
```

不配置 `VITE_API_BASE_URL` 时，页面继续读取前端本地 mock 数据，不需要启动后端。

如果需要在 `/map` 使用真实高德地图，在本地创建 `.env.local`：

```bash
VITE_AMAP_KEY=你的高德Web端JSAPIKey
VITE_AMAP_SECURITY_CODE=你的高德安全密钥
```

不要把真实 Key 或安全密钥提交到仓库。未配置这两个变量时，`/map` 会使用静态地图兜底。

如果遇到 `vite 不是内部或外部命令`、`Cannot find module`、依赖包找不到，或 `npm run dev` 提示缺包，优先确认是否忘记执行 `npm install`。

## 常用命令

```bash
npm run dev          # 启动开发服务器
npm run lint         # 检查代码问题
npm run build        # 检查项目能否构建
npm run format:check # 检查格式
npm run commit       # 按规范生成提交信息
```

后端命令在 `server/` 目录内执行：

```bash
npm run dev   # 启动最小 mock API 服务
npm run build # 检查后端 TypeScript 构建
npm run start # 运行构建后的后端服务
```

## 移动端开发基准

当前项目按移动端 H5 开发，设计和开发以 `375px` 宽度为基准。

页面需要在 375px 宽度下正常展示，不出现横向滚动或内容重叠。详细样式规则见 `docs/coding-guide.md`。

## 工程化配置

本项目配置了轻量工程化工具，目标是减少低级错误和多人协作时的格式冲突，不追求复杂流程。

- ESLint：检查 TypeScript / React 代码中的基础问题。
- Prettier：统一代码格式，避免无意义格式冲突。
- lint-staged：提交前只处理本次暂存的文件。
- Husky：在提交前自动执行检查。
- commitlint + cz-git：统一提交信息格式。

常见处理方式：

- 格式问题：运行 `npm run format`
- 代码检查问题：运行 `npm run lint`
- 提交信息问题：运行 `npm run commit`

## 提交信息

推荐使用：

```bash
npm run commit
```

提交格式只使用：

```txt
feat: 添加页面内容
feat(map): 添加地图页面内容
```

不要使用：

```txt
feat(): 添加页面内容
update
改了一下
```

## 文档索引

- AI / agent 修改规则：`AGENTS.md`
- 产品 PRD：`docs/tripkin-product-prd.md`
- 代码位置和样式规范：`docs/coding-guide.md`
- antd-mobile 使用规范：`docs/antd-mobile-usage-guide.md`
- 静态 Demo 统一整改范围：`docs/tripkin-demo-fix-scope.md`
- 页面协作任务清单：`docs/tripkin-page-collaboration-plan.md`
- 协作流程：`docs/collaboration-guide.md`
- 底部导航 Layout 迁移说明：`docs/navigation-layout-migration.md`
- 本地页面验证说明：`docs/webapp-testing-guide.md`
- 影响多人协作的决策记录：`docs/decision-notes/README.md`
