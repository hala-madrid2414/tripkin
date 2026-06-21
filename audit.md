# TripKin Style Audit

审计日期：2026-06-21

复扫范围：`src/**/*.less` 与 `src/**/*.css`。排除 `dist/`、`node_modules/` 与构建产物；TSX 内的 SVG path、mock 文案数字不计入 token 统计。

本次复扫用于确认“全局样式第一步”是否完成：先固化设计系统与全局 token，不要求一次性完成所有页面视觉迁移。

## 结论摘要

全局样式第一步已经完成。

已完成的部分：

- `DESIGN.md` 已经成为 TripKin 视觉规则的正式文档，明确 Map / Match / Bottle 是当前受保护的视觉基线。
- `src/styles/variables.less` 已经保留并固化批准后的 `font-*`、`space-*`、`radius-*`、语义颜色、语义阴影、页面渐变、Map 渲染 token 与 antd-mobile 适配变量。
- `src` 内已经扫不到 `--lv-*`，Profile 的旧私有薰衣草变量体系已从代码层移除。
- `src` 内已经扫不到旧的全局命名体系，例如 `--font-size-*`、`--space-xxs`、`--space-control-x`、`--radius-xs`、`--radius-control`、`--radius-card`。这些旧命名只在决策记录的历史说明中出现。
- `docs/decision-notes/README.md` 已经记录 2026-06-21 的全局 token 收敛决策。

仍未完成的部分属于后续迁移，而不是第一步阻塞项：

- Home 仍是硬编码样式最多的页面。
- Profile 已移除 `--lv-*`，但多个子页面仍保留较多旧薰衣草硬编码色值，需要继续按页面迁移到全局 token。
- Match 的 `--match-*` 仍作为基线保护适配层存在，可以保留。
- Map 的 `--map-*` 仍作为地图渲染数据存在，可以保留。
- 字号、圆角、间距仍有不少页面私有值，后续应按 `DESIGN.md` 渐进替换。

## 总量统计

| 类型         | 声明 / 命中次数 | 去重数量 | 对比上一轮             |
| ------------ | --------------: | -------: | ---------------------- |
| 样式文件     |              50 |        - | 持平                   |
| CSS 声明     |            5971 |        - | 约持平                 |
| 原始颜色     |             563 |      319 | 从 588 / 332 下降      |
| CSS 变量引用 |             936 |      119 | 引用增加，变量去重下降 |
| 字号         |             389 |       42 | 约持平                 |
| 圆角         |             291 |       56 | 约持平                 |
| 阴影         |              87 |       52 | 约持平                 |
| 间距         |             732 |      184 | 约持平                 |

解读：第一步的重点不是消灭所有硬编码，而是建立正式 token 与文档基线。变量引用增加、变量去重下降，说明全局 token 正在被更多页面使用，且命名体系更集中。

## 第一阶段完成度核对

| 检查项               | 状态         | 说明                                                                                                     |
| -------------------- | ------------ | -------------------------------------------------------------------------------------------------------- |
| 视觉基线文档         | 已完成       | `DESIGN.md` 明确 Map / Match / Bottle 是受保护基线                                                       |
| 全局字号 token       | 已完成       | `--font-micro` / `--font-caption` / `--font-body` / `--font-title` / `--font-heading` / `--font-display` |
| 全局间距 token       | 已完成       | `--space-0` 到 `--space-6` 与 `--space-page-x`                                                           |
| 全局圆角 token       | 已完成       | `--radius-sm` / `--radius-md` / `--radius-lg` / `--radius-xl` / `--radius-sheet` / `--radius-pill`       |
| 语义颜色与表面 token | 已完成       | 主紫、辅助色、文本色、边框、表面、页面背景已在 `variables.less` 中统一                                   |
| 语义阴影 token       | 已完成       | card / soft / floating / primary / popup / inset light 已统一                                            |
| antd-mobile 适配变量 | 已完成       | `--adm-*` 继续映射到 TripKin token                                                                       |
| Profile 私有变量体系 | 已完成第一步 | `--lv-*` 已移除；剩余硬编码色值待后续页面迁移                                                            |
| 决策记录             | 已完成       | 已记录 “Converge TripKin design tokens to DESIGN.md”                                                     |

## 当前变量引用排行

| 变量                                | 次数 | 观察                                  |
| ----------------------------------- | ---: | ------------------------------------- |
| `var(--color-muted)`                |   91 | 主体系高频，替代旧 Profile muted 角色 |
| `var(--color-heading)`              |   90 | 主体系高频                            |
| `var(--color-brand-primary)`        |   74 | 主紫已成为主要强调色                  |
| `var(--color-border)`               |   56 | 边框角色更集中                        |
| `var(--color-text)`                 |   38 | 正文色开始集中                        |
| `var(--color-surface-solid)`        |   34 | 白卡表面角色稳定                      |
| `var(--radius-pill)`                |   33 | chip / pill / CTA 仍是高频形态        |
| `var(--color-surface-glass)`        |   28 | 轻玻璃方向保留                        |
| `var(--color-brand-primary-strong)` |   26 | 主按钮 / 强强调角色                   |
| `var(--color-brand-primary-soft)`   |   25 | 选中、chip、柔背景角色                |

上一轮高频的 `var(--lv-text-muted)`、`var(--lv-heading)`、`var(--lv-primary)`、`var(--lv-border)`、`var(--lv-card)` 已不再出现。

## 高频原始颜色

| 值                          | 次数 | 当前判断                          |
| --------------------------- | ---: | --------------------------------- |
| `#9b8ec4`                   |   15 | Profile 旧 muted 色残留，后续迁移 |
| `#b89cff`                   |   15 | Profile 旧主紫残留，后续迁移      |
| `#f4f0ff`                   |   14 | 可逐步映射到主紫 soft / mist      |
| `#faf8ff`                   |   14 | 可逐步映射到 page / surface 背景  |
| `rgba(220, 207, 255, 0.45)` |   13 | 旧柔边框残留                      |
| `rgba(220, 207, 255, 0.5)`  |   13 | 旧柔边框残留                      |
| `rgba(148, 126, 200, 0.18)` |   12 | 旧薰衣草阴影残留                  |
| `rgba(36, 32, 52, 0.32)`    |   12 | overlay / scrim 候选              |
| `#4a3f6b`                   |   11 | 旧标题色残留                      |
| `#6b5e8a`                   |    9 | 旧正文色残留                      |

这些值说明 Profile 迁移并未完全结束，但第一阶段已经把“变量体系”收拢了。下一阶段应处理硬编码残留。

## 文件集中度

| 文件                                                                                     | 颜色 | 变量引用 | 字号 | 圆角 | 阴影 | 观察                                           |
| ---------------------------------------------------------------------------------------- | ---: | -------: | ---: | ---: | ---: | ---------------------------------------------- |
| `src/pages/Home/Home.module.less`                                                        |  163 |       83 |   41 |   56 |   17 | 首页仍是硬编码最多页面，但已开始使用全局 token |
| `src/styles/variables.less`                                                              |   51 |        9 |    0 |    1 |    0 | 全局 token 已集中在这里                        |
| `src/pages/Match/components/GradientVisual/GradientVisual.module.less`                   |   37 |        0 |    1 |    2 |    1 | 插画 / 视觉装饰色，暂可保留页面私有            |
| `src/pages/Map/Map.module.less`                                                          |   29 |      133 |   42 |   35 |    8 | 变量引用最高，符合基线保护策略                 |
| `src/pages/Profile/components/FootprintsPage/FootprintsPage.module.less`                 |   29 |        0 |    9 |    7 |    2 | Profile 子页仍需迁移硬编码                     |
| `src/pages/Profile/components/AchievementsPage/AchievementsPage.module.less`             |   26 |        0 |    9 |    5 |    1 | Profile 子页仍需迁移硬编码                     |
| `src/pages/Profile/components/FavoriteCompanionsPage/FavoriteCompanionsPage.module.less` |   24 |        0 |   11 |    6 |    1 | Profile 子页仍需迁移硬编码                     |
| `src/pages/Profile/components/TravelIdentityCard/TravelIdentityCard.module.less`         |   19 |       13 |    8 |    8 |    2 | 已部分使用 token                               |

## 字号审计

### 高频字号

| 值       | 次数 | 当前判断                                                       |
| -------- | ---: | -------------------------------------------------------------- |
| `13px`   |   54 | 后续可按语义迁移到 caption / body 之间的既有角色；不新增 token |
| `11px`   |   49 | 需要逐步并入 `--font-micro` 或 `--font-caption`                |
| `12px`   |   47 | 对应 `--font-caption`                                          |
| `14px`   |   39 | 对应 `--font-body`                                             |
| `16px`   |   39 | 对应 `--font-title`                                            |
| `10px`   |   21 | 对应 `--font-micro`                                            |
| `15px`   |   19 | 后续按语义并入 body / title，不新增 token                      |
| `18px`   |   13 | 后续按语义并入 title / heading，不新增 token                   |
| `20px`   |   13 | 对应 `--font-heading`                                          |
| `10.5px` |   11 | 建议合并到 `--font-micro` 或保留为特殊装饰值                   |

`DESIGN.md` 已明确禁止新增字号 token，因此后续处理方式应是按语义替换，而不是恢复旧的 `--font-size-*` 体系。

## 圆角审计

### 高频圆角

| 值                         | 次数 | 当前判断                                      |
| -------------------------- | ---: | --------------------------------------------- |
| `50%`                      |   40 | 真实圆形，保留直接值                          |
| `16px`                     |   34 | 对应 `--radius-lg`                            |
| `var(--radius-pill)`       |   32 | 已纳入全局 token                              |
| `14px`                     |   20 | 后续按语义并入 `--radius-md` 或 `--radius-lg` |
| `var(--match-radius-pill)` |   15 | Match 基线保护 adapter，暂保留                |
| `999px`                    |   13 | 后续替换为 `--radius-pill`                    |
| `var(--radius-lg)`         |   11 | 已开始使用全局 token                          |
| `12px`                     |   10 | 对应 `--radius-md`                            |
| `8px`                      |    9 | 对应 `--radius-sm`                            |
| `var(--match-radius-sm)`   |    9 | Match adapter，暂保留                         |

第一阶段已经建立圆角 token。后续目标是减少页面内裸写 `12px`、`14px`、`16px`、`999px`，但不需要新增 token。

## 页面判断

### Profile

结论：第一阶段完成，后续迁移仍未完成。

`--lv-*` 已经从代码中消失，这是本轮最重要的完成信号。但 Profile 多个子页面仍保留旧薰衣草硬编码颜色、边框和阴影。下一步建议按子页面逐个迁移，不做一次性大替换。

### Home

结论：进入后续迁移队列。

Home 仍有最高的原始颜色、圆角和阴影数量，但它也已经开始使用 `--space-*`、`--font-*`、`--radius-*` 与主色 token。后续迁移应优先处理搜索框、快捷功能卡、推荐卡、CTA、弹层等共享 UI 语义，插画和局部装饰渐变可以继续保留页面私有值。

### Map

结论：保持基线保护。

Map 的变量引用最多，说明它已经较多使用主体系。地图渲染和热力层相关的 `--map-*` 属于数据 / 渲染 token，不应为了“消除页面 token”而迁移。

### Match

结论：保持 adapter。

`--match-*` 仍存在，但它是页面基线保护适配层，不等同于 Profile 旧私有体系。只要全局语义未完全稳定，Match adapter 可以保留。

### Bottle / MBTI / BottomNav / MbtiEntryModal

结论：已开始跟随全局 token。

这些页面和公共 UI 已经能看到 `font-*`、`radius-*`、`space-*` 等新 token 的使用。后续只需要在具体页面改动时顺手收敛，不需要单独作为第一阶段阻塞项。

## 后续建议

### 第二批：Profile 硬编码迁移

优先处理这些残留：

- `#b89cff`、`#9b8ec4`、`#f4f0ff`、`#faf8ff`
- `rgba(220, 207, 255, 0.45 / 0.5)`
- `rgba(148, 126, 200, 0.18)`
- `#4a3f6b`、`#6b5e8a`

策略：按 Profile 子页面小步替换，保持视觉接近，不重做结构。

### 第三批：Home 高频样式收敛

优先收敛共享 UI 语义：

- 搜索框：`surface / radius-lg / font-body / floating shadow`
- 快捷功能卡：`surface-solid / radius-lg / shadow-card-soft`
- 推荐卡：`radius-xl / surface / font-title / font-caption`
- 主 CTA：`gradient-primary / shadow-primary / radius-pill`
- 弹层：`radius-sheet / shadow-popup`

插画和氛围装饰值暂时保留页面私有。

### 第四批：裸值替换

在后续页面维护中逐步替换：

- `12px` -> `--font-caption` 或 `--radius-md`，按属性语义判断
- `14px` -> `--font-body` 或靠近的 spacing/radius token，按属性语义判断
- `16px` -> `--font-title` / `--space-4` / `--radius-lg`
- `20px` -> `--font-heading` / `--space-5`
- `24px` -> `--font-display` / `--space-6`
- `999px` -> `--radius-pill`

不要新增 `--font-size-*`、`--space-xxs`、`--radius-card` 等旧式或中间态 token。

## 最终判断

本轮可以把“全局样式第一步”标记为完成。

完成标准不是所有页面都没有硬编码，而是：

1. 有正式设计规则：`DESIGN.md`。
2. 有稳定全局 token：`src/styles/variables.less`。
3. 旧并行变量体系已清理：`--lv-*` 在 `src` 中已消失。
4. 决策已同步：`docs/decision-notes/README.md` 已记录。
5. 后续迁移边界清楚：Profile 硬编码、Home 高频样式、Match adapter、Map 渲染 token 各自归类明确。

因此，下一步不应继续补“第一步 token 设计”，而应进入页面级渐进迁移：先 Profile，再 Home，之后按具体页面维护机会收敛 Bottle / MBTI / Map / Match。
