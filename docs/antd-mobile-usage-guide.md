# antd-mobile 使用规范

本规范用于 TripKin 当前前端 Demo 阶段。目标是允许团队用 antd-mobile 快速完成移动端基础交互，同时避免页面被组件库默认视觉完全带跑。

## 当前结论

已确认：当前阶段可以在需要时引入和使用 `antd-mobile`。

使用原则是：**用它提速，不让它定风格**。

适合交给 antd-mobile 的部分：

- 弹窗、抽屉、Toast、Dialog 等基础交互。
- Tabs、Segmented、Picker、Selector 等移动端常见控件。
- 表单输入、开关、单选、多选等标准行为。
- 低风险的反馈状态，例如加载、空状态提示、轻确认。

需要谨慎使用或优先自定义的部分：

- 大面积 `List`。
- 默认 `Card`。
- 默认 `NavBar`。
- 直接决定页面第一视觉的按钮、卡片、标签和头图区域。

如果默认组件一眼看起来“组件库味”太重，可以只使用它的交互能力，外观通过页面 CSS Modules 自定义；必要时页面局部自己写。

## 使用边界

必须：

- 页面仍按 `375px` 移动端基准开发。
- 页面样式仍优先使用 `*.module.less`。
- 页面级视觉主题、间距、圆角、标签、卡片层级由当前页面样式控制。
- 只在确实能减少实现成本时使用 antd-mobile。
- 引入新组件前确认它不会明显破坏当前页面视觉风格。

不要：

- 为了使用组件库而重写已经稳定的页面结构。
- 直接堆默认 antd-mobile 组件当最终视觉。
- 为单个页面的小交互提前抽跨页面公共组件。
- 在没有必要时引入 antd-mobile 的全局样式改造方案。
- 使用 antd-mobile 暗示项目已经有真实登录、后端、聊天或复杂业务能力。

## 推荐用法

优先使用：

- `Popup`：底部弹层、筛选弹层、详情弹层。
- `Toast`：按钮操作后的轻反馈。
- `Dialog`：确认类操作。
- `Tabs` / `Segmented`：页面内部模式切换。
- `Selector` / `Picker`：移动端筛选控件。
- `Input` / `TextArea`：表单输入。

谨慎使用：

- `List`：容易形成标准设置页质感，除非信息结构非常适合。
- `Card`：容易压掉项目自己的卡片视觉，核心卡片优先自己写。
- `NavBar`：如果页面顶部需要强旅行产品氛围，优先自定义。
- `Button`：可以用，但主按钮样式应覆盖成项目视觉。

## `/match` 页面的建议

`/match` 可以优先用 antd-mobile 搭基础交互：

- 用 `Tabs` 或 `Segmented` 实现“搭子匹配 / 行程匹配”切换。
- 用 `Popup` 实现筛选弹层、他人身份卡、申请组队确认。
- 用 `Toast` 实现“加好友”“申请加入”等 Demo 反馈。
- 用 `TextArea` 实现申请说明输入区。

但以下内容建议页面内自定义：

- 搭子卡片。
- 行程卡片。
- 筛选 chip。
- 紫色主按钮和轻按钮。
- 页面顶部目的地信息区。
- 空状态引导。

这样可以兼顾开发速度和参考图里的旅行社交气质。

## 样式约束

项目已经在 `src/styles/variables.less` 中覆盖 antd-mobile 的基础 CSS 变量，用来让组件的主色、文字色、弱文本、成功色和基础圆角接近 TripKin 视觉底座。当前使用的关键变量包括：

- `--adm-color-primary`
- `--adm-color-success`
- `--adm-color-text`
- `--adm-color-weak`
- `--adm-color-light`
- `--adm-border-radius`

antd-mobile v5 的 `ConfigProvider` 主要用于 locale、默认图标等配置，不作为当前项目的主题 token 入口。视觉主题优先通过 CSS 变量和页面 CSS Modules 控制。

页面内覆盖 antd-mobile 样式时，优先用页面容器包住局部范围，例如：

```tsx
<main className={styles.matchPage}>...</main>
```

对应样式只写在当前页面的 CSS Module 内，避免全局污染。

如果确实需要继续修改 antd-mobile 全局主题变量，必须先说明影响范围，并同步记录到 `docs/decision-notes/README.md`。

不要大面积覆盖 antd-mobile 内部选择器来“重做组件库”。卡片、chip、主按钮、页面头部、底部弹层内容区等决定页面气质的部分，仍优先由页面 CSS Modules 自定义。

## 新增依赖注意

如果当前分支首次安装 `antd-mobile`，需要：

1. 在同一次变更中更新 `package.json` 和 lockfile。
2. 运行 `npm install`。
3. 运行 `npm run lint` 和 `npm run build`。
4. 在提交说明里写清楚使用它服务的页面或交互。

本规范只确认 antd-mobile 在当前 Demo 阶段可用，不代表所有页面都必须使用它。
