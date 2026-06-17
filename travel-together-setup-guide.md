# TripKin - 建仓与工程化配置步骤

## 0. 命名约定

- 产品展示名：`TripKin`
- Git 仓库名：`tripkin`
- 本地项目目录名：推荐 `tripkin`

## 1. 当前目标

先搭一个适合 5 人并行开发的前端壳子，优先保证：

- 项目能快速启动
- 路由能跑通
- 页面能按人拆分
- 样式和提交规范能统一
- 后续可继续补逻辑、补 mock、补接口

当前阶段暂不落地：

- 后端仓库
- 数据库
- 登录体系
- AI 接口
- 重组件库
- 复杂 CI

---

## 2. 当前已定技术栈

- `React`
- `Vite`
- `TypeScript`
- `React Router`
- `Zustand`
- `Axios`
- `Less`
- `CSS Modules`
- `ESLint`
- `Prettier`
- `Husky`
- `lint-staged`
- 包管理器：`npm`

待后续继续讨论：

- 组件库是否接入、接哪个
- 移动端适配细节

---

## 3. 初始化项目

### 3.1 创建项目

```bash
npm create vite@latest tripkin -- --template react-ts
cd tripkin
npm install
```

### 3.2 安装运行时依赖

```bash
npm install react-router-dom zustand axios
```

### 3.3 安装样式支持

```bash
npm install less
```

### 3.4 安装工程化依赖

```bash
npm install -D eslint prettier husky lint-staged eslint-config-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react-hooks eslint-plugin-react-refresh
```

---

## 4. 建立基础目录

先在 `src/` 下建立这些目录：

```txt
src/
  assets/
  components/
  modules/
  pages/
  router/
  services/
  store/
  styles/
  types/
  utils/
```

推荐额外建立文档目录：

```txt
docs/
```

---

## 5. 路径别名

当前决定：开启 `@`，指向 `src`。

### 5.1 修改 `tsconfig.json`

确保存在：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### 5.2 修改 `vite.config.ts`

给 Vite 加别名解析：

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
```

如果当前模板没有 Node 路径类型支持，再补：

```bash
npm install -D @types/node
```

---

## 6. 路由第一版骨架

当前建议先建这些带路由页面：

- `/mbti`
- `/map`
- `/bottle`
- `/match`
- `/profile`（可选）

当前决定：

- 根路径 `/` 直接重定向到 `/mbti`

第一版要求不是做完内容，而是先让页面能跳起来、能截图、能继续往里填。

---

## 7. 文件与命名规范

### 7.1 命名

- 文件夹名：英文
- 组件名：英文
- 路由 path：英文
- 页面展示文案：中文

### 7.2 页面/组件结构

统一使用：

```txt
组件名/
  index.tsx
  组件名.module.less
```

示例：

```txt
pages/
  Mbti/
    index.tsx
    Mbti.module.less

components/
  IdentityCard/
    index.tsx
    IdentityCard.module.less
```

默认使用 `CSS Modules`，除全局样式外，不默认写普通 `.less`。

---

## 8. 样式规则

当前先统一：

- 页面/组件样式：`*.module.less`
- 全局样式目录：`src/styles/`

推荐建立：

```txt
styles/
  reset.less
  global.less
  variables.less
```

建议职责：

- `reset.less`：浏览器基础重置
- `global.less`：`body`、字体、背景、全局基础类
- `variables.less`：颜色、圆角、阴影、间距等变量

---

## 9. ESLint / Prettier / Husky / lint-staged

当前原则：只做轻工程化，不加重流程。

### 9.1 ESLint

用于拦明显问题、统一基本代码习惯。

### 9.2 Prettier

用于统一格式。

### 9.3 Husky + lint-staged

提交前只做轻量检查：

- `prettier --write`
- `eslint --fix`

不要现在就加：

- `commitlint`
- `stylelint`
- 提交前跑大构建
- 提交前跑测试
- 复杂 CI

---

## 10. 推荐的 `package.json` 脚本方向

最少先准备这些：

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

后续再补：

- `prepare`
- `lint-staged`

---

## 11. 请求层规则

当前决定：保留 `src/services/`。

规则：

- 页面里不要直接手写 `axios`
- 未来统一在 `services/` 收口
- 现在如果项目刚起步，`services/` 可以先空着

后续常见结构可参考：

```txt
services/
  request.ts
  mbti.ts
  map.ts
  bottle.ts
  match.ts
```

---

## 12. Mock 处理原则

当前决定：先不单独搭重 mock 体系。

建议：

- 页面临时展示数据可以先局部写
- 一旦出现复用或多人共用，再抽到统一位置

当前重点是壳子和分工，不是数据工程。

---

## 13. AI 协作文档最低配置

建议第一天就放这 3 份：

- `README.md`
- `docs/architecture.md`
- `docs/collaboration.md`

作用：

- 让人看懂项目
- 让 AI 知道目录边界
- 让协作方式稳定

---

## 14. 建仓完成后的第一批动作

推荐顺序：

1. 初始化 Vite React TS 项目
2. 安装依赖
3. 建基础目录
4. 开 `@` 别名
5. 配路由
6. 建 4 个主页面占位
7. 接入全局样式
8. 配 ESLint / Prettier
9. 配 Husky / lint-staged
10. 跑通本地项目

---

## 15. 当前版本的完成标准

做到这些就算第一版壳子合格：

- 项目能启动
- 路由能跳
- 目录清楚
- 页面占位齐
- 样式方案统一
- 提交前有基础 lint 和格式化

这版的目标不是“完备”，而是“所有人今晚就能开始往里写”。
