# TripKin

TripKin 是一个移动端 H5 旅行搭子 Demo，目前用于比赛作品原型开发。

仓库文档只记录当前已经确认、会影响开发协作的事实。未确认的产品想法、分工和远期规划放在飞书讨论，不写成仓库规则。

## 当前目标

当前阶段先完成可运行、可截图、可继续迭代的前端 Demo。

已确定的主流程页面包括：

- 旅行 MBTI：`/mbti`
- 旅行地图：`/map`
- 旅行漂流瓶：`/bottle`
- 搭子 / 行程匹配：`/match`

当前阶段暂不处理真实登录、真实后端、真实匹配算法和真实 AI 接口。

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

如果遇到 `vite 不是内部或外部命令`、`Cannot find module`、依赖包找不到，或 `npm run dev` 提示缺包，优先确认是否忘记执行 `npm install`。

## 常用命令

```bash
npm run dev          # 启动开发服务器
npm run lint         # 检查代码问题
npm run build        # 检查项目能否构建
npm run format:check # 检查格式
npm run commit       # 按规范生成提交信息
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
- 代码位置和样式规范：`docs/coding-guide.md`
- 协作流程：`docs/collaboration-guide.md`
- 影响多人协作的决策记录：`docs/decision-notes/README.md`
