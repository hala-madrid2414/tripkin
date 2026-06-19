# 本地页面验证说明

本文档说明如何在 TripKin 当前前端 Demo 阶段，按需使用 `webapp-testing` 做本地页面验证。

`webapp-testing` 是赶 Demo 阶段的可选本地辅助验证方式，不是项目正式测试框架，也不是默认开发流程。当前不会因此新增 npm `test` 脚本、Playwright 依赖、CI 流程、后端、数据库或真实 API。

## 什么时候才使用

只有当用户或任务明确提到测试、`webapp-testing`、Playwright、自动化验证、截图验证、可重复验证，或要求用浏览器脚本检查页面时，AI 或协作者才使用这套流程。

如果只是普通页面开发、样式调整或一次性查看 localhost，默认不启用 `webapp-testing`。可以用 Codex 自带浏览器快速看页面，也可以由人工做视觉走查。

## 适合验证什么

适合用 `webapp-testing` 做可重复的浏览器检查：

- 路由可以正常打开，例如 `/match`、`/map`、`/mbti`、`/bottle`。
- JS 加载完成后，页面主体内容正常渲染。
- 375px 宽度下没有明显横向滚动、内容重叠或关键按钮被遮挡。
- 按钮、Tabs、弹层、筛选、跳转等关键交互可以按预期触发。
- 浏览器控制台没有意外运行时报错。
- 需要保存截图作为复查或对比依据。

不适合用它替代：

- `npm run lint`
- `npm run build`
- 人工视觉走查
- 单元测试或正式 E2E 测试框架
- 官方 CI 验证
- 后端、数据库、真实 AI 接口或真实第三方服务验证
- 产品最终验收

## 本地隔离要求

使用 `webapp-testing` 时，Python 环境和临时脚本必须只放在本地虚拟环境里：

```bash
python -m venv .venv
```

`.venv/` 已经加入 Git 忽略，不提交到仓库。其他人不使用这套验证方式时，不需要创建 `.venv`。第一次使用 `webapp-testing` 前，应先引导使用者建立 `.venv`，再继续安装依赖或写临时脚本。

临时 Playwright 脚本必须放在：

```txt
.venv/webapp-tests/
```

自动化运行产物必须放在：

```txt
.venv/webapp-artifacts/screenshots/
.venv/webapp-artifacts/traces/
.venv/webapp-artifacts/logs/
```

如果需要保留人工整理后的测试结论、问题记录、对比说明或精选截图引用，可以写到 `.local-docs/`。不要把自动化运行产生的大量截图、trace、video、console log 或 DOM dump 放进 `.local-docs/`。

不要把以下内容提交到仓库：

- `.venv/`
- 临时 Python Playwright 脚本
- 本地截图
- trace、video、log 等浏览器运行产物

如果某个验证脚本将来确认需要团队长期复用，需要先单独讨论是否引入正式测试目录和依赖。不要在赶 Demo 阶段直接把临时脚本提升为项目测试框架。

## Skill 来源

不要把某个人本机 AI 目录里的 `webapp-testing` skill 复制到仓库。它属于个人或 AI 工具环境能力，不是 TripKin 项目源码、项目依赖或团队测试框架。

如果当前 AI 环境没有安装 `webapp-testing`，应先说明缺失情况，并引导使用者在自己的 AI 工具目录中安装或启用对应 skill。不同工具和机器的目录可能不同，例如 `.codex`、其他 agent 配置目录或插件缓存目录，不要在仓库文档里固定某个人的绝对路径。

如果暂时无法安装 `webapp-testing`，可以退回到 Codex 自带浏览器做一次性页面检查，或由人工做视觉走查；不要为了临时验证把 skill 文件、Playwright 脚本或 Python 依赖提交进仓库。

## 推荐使用方式

第一次使用前，先在 PowerShell 中创建测试区：

```powershell
python -m venv .venv
New-Item -ItemType Directory -Force -Path .venv\webapp-tests, .venv\webapp-artifacts\screenshots, .venv\webapp-artifacts\traces, .venv\webapp-artifacts\logs
```

然后按本机环境激活虚拟环境，并在虚拟环境中安装需要的 Python 依赖和 Playwright 浏览器：

```powershell
.\.venv\Scripts\Activate.ps1
python -m pip install playwright
python -m playwright install chromium
```

使用技能自带的 server helper 前，先查看帮助：

```powershell
python <你的 webapp-testing skill 目录>\scripts\with_server.py --help
```

验证 Vite 页面时，推荐让 helper 管理本地服务生命周期：

```powershell
python <你的 webapp-testing skill 目录>\scripts\with_server.py --server "npm run dev" --port 5173 -- python .venv\webapp-tests\smoke.py
```

临时脚本只写浏览器自动化逻辑。动态页面检查时，需要先等待页面加载完成，再截图、读 DOM 或点击：

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 375, "height": 812})
    page.goto("http://localhost:5173/match")
    page.wait_for_load_state("networkidle")
    page.screenshot(path=".venv/webapp-artifacts/screenshots/match.png", full_page=True)
    browser.close()
```

## 和其他检查方式的分工

`webapp-testing` 适合可重复检查：打开路由、等待渲染、捕获控制台错误、点击关键控件、检查 375px 页面是否出现明显布局问题、生成截图。

Codex 自带浏览器适合快速探索：打开 localhost、临时点一遍页面、看某个视觉问题、做一次性截图或确认交互入口。

人工视觉走查适合主观判断：页面是否接近参考图、视觉层级是否舒服、间距和信息密度是否合理、截图整体是否“看起来对”。

提交前仍然必须运行：

```bash
npm run lint
npm run build
```

如果改了 Markdown 或格式相关内容，也运行：

```bash
npm run format:check
```
