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
- 对移动端标准交互优先使用 antd-mobile，例如弹层、模式切换、表单输入、选择器和 Toast；页面视觉再通过 CSS Modules 覆盖成项目风格。
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

## 高交互页面建议

高交互移动页可以优先用 antd-mobile 搭基础行为：

- 用 `Tabs` 或 `Segmented` 处理页面内部模式切换。
- 用 `Popup` 处理底部弹层、筛选弹层和详情弹层。
- 用 `Toast` 处理按钮操作后的 Demo 反馈。
- 用 `TextArea` / `Input` 处理表单输入。
- 筛选项需要真实交互时，优先评估 `Selector` / `Picker`。

但以下内容通常建议页面内自定义：

- 决定页面气质的核心卡片。
- 特殊标签、chip 和状态徽标。
- 主按钮、轻按钮和强品牌操作区。
- 页面顶部信息区。
- 空状态和引导区。

如果某个页面已经确认有高保真参考图，antd-mobile 默认视觉不能直接作为最终视觉；应使用页面或组件级 CSS Modules 将外观调整到已确认的参考方向。

## 图标策略

通用 UI 图标优先复用已经引入的 `antd-mobile-icons`，不要在每个页面继续手写重复 SVG。

适合使用统一图标来源的内容包括：

- 返回、关闭、筛选、搜索、定位、日历。
- 消息、点赞、收藏、关注、编辑、相机、加号。

可以继续自绘或页面内自定义的内容包括：

- BottleGlyph。
- 地图图层、热力、点位等业务渲染。
- MBTI / TripKin 旅行人格头像。
- 页面插画、品牌符号和装饰性场景。

新增或替换图标时，不要为了图标统一改动业务逻辑、路由、mock 数据或页面信息结构。

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
<main className={styles.page}>...</main>
```

对应样式只写在当前页面的 CSS Module 内，避免全局污染。

如果确实需要继续修改 antd-mobile 全局主题变量，必须先说明影响范围，并同步记录到 `docs/decision-notes/README.md`。

不要大面积覆盖 antd-mobile 内部选择器来“重做组件库”。卡片、chip、主按钮、页面头部、底部弹层内容区等决定页面气质的部分，仍优先由页面 CSS Modules 自定义。

## React 19 兼容

当前项目使用 React 19。antd-mobile v5 的动态容器能力，例如 `Popup`、`Toast`、`Dialog`，需要在应用入口统一配置 React 19 渲染适配。

项目已在 `src/main.tsx` 配置 `unstableSetRender`，让 antd-mobile 临时容器使用 `createRoot` 和 `root.unmount()`。页面和共享组件不要重复配置这段兼容逻辑。

## 新增依赖注意

如果当前分支首次安装 `antd-mobile`，需要：

1. 在同一次变更中更新 `package.json` 和 lockfile。
2. 运行 `npm install`。
3. 运行 `npm run lint` 和 `npm run build`。
4. 在提交说明里写清楚使用它服务的页面或交互。

本规范只确认 antd-mobile 在当前 Demo 阶段可用，不代表所有页面都必须使用它。
