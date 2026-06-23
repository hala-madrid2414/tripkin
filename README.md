# TripKin 刷到即同行

<p align="center">
  <img alt="Project status" src="https://img.shields.io/badge/status-product%20prototype-6d5df6">
  <img alt="Mobile H5" src="https://img.shields.io/badge/mobile-H5-8b7cf6">
  <img alt="React 19" src="https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white">
  <img alt="Vite 8" src="https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white">
  <img alt="TypeScript 6" src="https://img.shields.io/badge/TypeScript-6-3178c6?logo=typescript&logoColor=white">
  <img alt="MIT License" src="https://img.shields.io/badge/license-MIT-green">
</p>

TripKin 是一个移动端 H5 旅行搭子与旅行陪伴产品原型。

它围绕“旅行前不知道去哪、和谁去、怎么玩”的轻量场景，串联旅行人格测试、目的地探索、旅行漂流瓶、搭子 / 行程匹配和个人旅行身份页，形成一条可演示、可截图、可继续迭代的移动端产品体验。

当前项目不是已上线产品，也不是完整商业化 App；它更接近一个已经具备核心页面、主流程和视觉基线的产品型 Demo。

## 产品体验

TripKin 当前主链路：

```txt
首页 -> 旅行 MBTI -> 旅行身份卡 -> 旅行地图 -> 漂流瓶 / 搭子匹配 -> 我的旅行身份
```

核心体验包括：

- 用旅行 MBTI 生成用户的 TripKin 旅行人格。
- 在地图中浏览目的地、热度、漂流瓶和搭子信息。
- 围绕目的地查看旅行故事、心愿、攻略和搭子瓶。
- 按目的地查看搭子和行程匹配结果。
- 在个人页沉淀旅行身份、标签、足迹、故事和收藏摘要。

## 页面预览

当前仓库暂未提交正式截图。后续可以在这里补充移动端页面预览图。

| 首页       | 旅行 MBTI  | 地图       |
| ---------- | ---------- | ---------- |
| 截图待补充 | 截图待补充 | 截图待补充 |

| 漂流瓶     | 搭子匹配   | 我的旅行身份 |
| ---------- | ---------- | ------------ |
| 截图待补充 | 截图待补充 | 截图待补充   |

建议截图尺寸以移动端 375px 宽度为基准，优先展示主链路页面和关键弹层。

## 核心功能

### 旅行人格

旅行 MBTI 用一组轻量选择题生成用户的旅行人格，并沉淀为后续页面可复用的旅行身份。

当前已确认的人格包括：

- 赛博特种兵
- 精神卡皮巴拉
- 精算系旅行家
- 人文浪漫主义

### 旅行地图

地图页是目的地探索枢纽，支持目的地搜索、区域 / 点位信息、热度图层、静态地图兜底，以及跳转到同目的地的漂流瓶和搭子匹配页面。

如果本地配置高德地图 Key，地图页可以接入真实高德 Web JSAPI；未配置时会使用静态地图兜底，保证 Demo 可运行。

### 旅行漂流瓶

漂流瓶页围绕当前目的地展示旅行故事、心愿、攻略和搭子相关内容，支持列表筛选、详情弹层、点赞收藏关注、发布漂流瓶等 Demo 交互。

### 搭子 / 行程匹配

匹配页围绕当前目的地展示搭子和行程两类结果，支持模式切换、筛选弹层、他人身份卡和加入行程弹层。

当前匹配结果来自 mock 数据，不代表真实匹配算法。

### 我的旅行身份

个人页展示用户的旅行身份卡、TripKin 旅行人格、匹配画像、旅行故事、行程、足迹、成就和收藏摘要。

如果用户尚未完成旅行 MBTI，个人页会引导进入测试流程。

## 当前阶段

TripKin 当前处于移动端 H5 产品原型阶段，目标是：

- 跑通主链路页面。
- 保持页面可以本地运行和截图展示。
- 统一移动端视觉基线。
- 为后续前后端联调保留最小 mock API 链路。
- 保持多人按页面协作时的目录和样式边界清晰。

当前不包含：

- 真实登录系统
- 数据库
- 真实 AI 接口
- 真实聊天或好友系统
- 真实图片上传
- 真实匹配算法
- 生产级后端能力
- 复杂 CI 或正式测试框架

## 技术栈

前端：

- React
- Vite
- TypeScript
- React Router
- Zustand
- Less
- CSS Modules
- antd-mobile
- antd-mobile-icons

后端 mock：

- TypeScript
- Express

工程化：

- ESLint
- Prettier
- Husky
- lint-staged
- commitlint
- cz-git

## 本地运行

本项目需要本机已安装 Node.js，并且可以使用 npm。

安装依赖：

```bash
npm install
```

启动前端开发服务器：

```bash
npm run dev
```

构建检查：

```bash
npm run build
```

代码检查：

```bash
npm run lint
```

格式检查：

```bash
npm run format:check
```

## Mock API

项目在 `server/` 下提供最小 TypeScript Express mock API，用于 Match 和 Bottle 的前后端联调准备。

启动 mock API：

```bash
cd server
npm install
npm run dev
```

默认地址：

```txt
http://localhost:3001
```

健康检查：

```txt
http://localhost:3001/api/health
```

当前前端默认可以纯前端运行。只有在 `.env.local` 中配置 `VITE_API_BASE_URL` 时，`src/services` 才会请求本地 mock API：

```bash
VITE_API_BASE_URL=http://localhost:3001
```

不配置时，页面继续读取前端本地 mock 数据。

## 环境变量

如需在 `/map` 使用真实高德地图，在项目根目录创建 `.env.local`：

```bash
VITE_AMAP_KEY=你的高德Web端JSAPIKey
VITE_AMAP_SECURITY_CODE=你的高德安全密钥
```

不要把真实 Key 或安全密钥提交到仓库。

未配置这两个变量时，地图页会使用静态地图兜底。

## 页面路由

| 页面            | 路由           | 说明                   |
| --------------- | -------------- | ---------------------- |
| 首页            | `/`            | 产品入口与核心功能聚合 |
| 旅行 MBTI 首页  | `/mbti`        | 旅行人格测试入口       |
| 旅行 MBTI 测试  | `/mbti/test`   | 答题流程               |
| 旅行 MBTI 结果  | `/mbti/result` | 旅行身份结果页         |
| 旅行地图        | `/map`         | 目的地探索枢纽         |
| 旅行漂流瓶      | `/bottle`      | 目的地内容互动分支     |
| 搭子 / 行程匹配 | `/match`       | 搭子与行程匹配分支     |
| 我的旅行身份    | `/profile`     | 个人旅行身份页         |

底部主导航固定为：

```txt
首页 / 地图 / 匹配 / 我的
```

对应路由：

```txt
/ /map /match /profile
```

`/mbti`、`/mbti/test`、`/mbti/result` 和 `/bottle` 属于流程页或内容分支，不作为底部主导航入口。

## 项目结构

```txt
src/
  pages/        路由页面
  modules/      页面内部大功能块
  components/   跨页面复用 UI
  layouts/      应用级页面外壳
  services/     请求与数据访问
  store/        跨页面 Zustand 状态
  styles/       全局样式与视觉变量
  types/        共享 TypeScript 类型
  utils/        纯工具函数

server/         最小 TypeScript Express mock API
docs/           产品、协作、编码和验证文档
```

当前页面开发优先放在 `src/pages/<PageName>/`。只有确认跨页面复用后，才抽到 `src/components`。

## 文档导航

产品与设计：

- [产品 PRD](docs/tripkin-product-prd.md)
- [视觉设计系统](DESIGN.md)

开发与协作：

- [代码位置与样式规范](docs/coding-guide.md)
- [协作说明](docs/collaboration-guide.md)
- [antd-mobile 使用规范](docs/antd-mobile-usage-guide.md)
- [本地页面验证说明](docs/webapp-testing-guide.md)
- [决策记录](docs/decision-notes/README.md)

AI / agent 协作：

- [AGENTS.md](AGENTS.md)

## 开发约定摘要

- 移动端 H5 优先，375px 宽度为主要设计和验收基准。
- 页面宽度保持流式，不写死 375px 固定画布。
- 页面内容优先留在对应页面目录。
- 页面私有组件不提前抽公共组件。
- 请求和数据访问统一收口到 `src/services`。
- 跨页面共享状态放入 `src/store`。
- 样式默认使用 CSS Modules。
- 标准移动端交互可以使用 antd-mobile，但页面视觉由 TripKin 自己的 CSS Modules 和设计 token 控制。
- 新增依赖、真实后端能力、真实 AI 接口、数据库或复杂 CI 前必须先确认。

## 常用命令

```bash
npm run dev          # 启动前端开发服务器
npm run build        # 构建检查
npm run lint         # 代码检查
npm run lint:fix     # 自动修复部分 lint 问题
npm run format       # 格式化项目文件
npm run format:check # 检查格式
npm run preview      # 预览构建产物
npm run commit       # 按规范生成提交信息
```

后端 mock 命令需要在 `server/` 目录下执行：

```bash
npm run dev   # 启动 mock API
npm run build # 构建后端 TypeScript
npm run start # 运行构建后的后端服务
```

## 提交信息

推荐使用：

```bash
npm run commit
```

提交格式：

```txt
type: subject
type(scope): subject
```

示例：

```txt
feat: 添加页面内容
feat(map): 添加地图页面内容
fix(match): 修复匹配页状态问题
docs: 更新 README
```

不要使用：

```txt
feat(): subject
update
改了一下
```

## 验证

如果改动包含源码、样式、路由、脚本、依赖、工程配置、后端代码，或会影响运行行为，完成前至少运行：

```bash
npm run lint
npm run build
```

如果只修改 Markdown 文档，且不改变代码、配置、脚本或运行行为，不强制运行上述命令。

如果文档格式需要验证，可以运行：

```bash
npm run format:check
```

## License

[MIT License](LICENSE).
