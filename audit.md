# TripKin Style Audit

Audit date: 2026-06-21

Scope: `src/**/*.less` and `src/**/*.css`. Excludes `dist/`, `node_modules/`, TSX SVG paths, mock text, and build artifacts.

This rescan reflects the Home + Profile product-look migration. It is meant to answer whether the next work should continue broad style-token migration, or move to product-level visual QA and page polish.

## Summary

The Home + Profile style migration has moved the project past the previous blocker.

Completed in this pass:

- Home shared UI patterns now use the TripKin semantic system for search, panels, cards, CTAs, typography, radius, shadows, and text roles.
- Profile no longer has the old lavender hardcoded residue called out in the previous audit.
- The old Profile values `#b89cff`, `#9b8ec4`, `#f4f0ff`, `#faf8ff`, `rgba(220, 207, 255, ...)`, `rgba(148, 126, 200, 0.18)`, `#4a3f6b`, `#6b5e8a`, and `--lv-*` have zero matches under `src/`.
- Global token usage increased strongly, which means page styles are now leaning on `DESIGN.md` instead of parallel page-local systems.

Current conclusion:

The next work should not be another broad token sweep. The next work should be product-level visual QA and targeted page polish: check the running Home/Profile screens at 375px, then fix visible density, hierarchy, icon/copy, and interaction issues that make the demo feel less like a cohesive product.

## Totals

| Metric                            | Current | Previous audit | Read                                      |
| --------------------------------- | ------: | -------------: | ----------------------------------------- |
| Style files                       |      50 |             50 | Same scope                                |
| CSS declarations                  |    5964 |           5971 | Roughly flat                              |
| Raw color hits                    |     288 |            563 | Large drop after Home/Profile migration   |
| Unique raw colors                 |     223 |            319 | Large drop, but decorative art remains    |
| CSS variable references           |    1455 |            936 | Strong increase                           |
| Unique CSS variables              |     123 |            119 | Slight increase, no new token scale added |
| Font-size declarations            |     389 |            389 | Same count, more values now tokenized     |
| Unique font-size declarations     |      42 |             42 | Same count                                |
| Border-radius declarations        |     291 |            291 | Same count, more values now tokenized     |
| Unique border-radius declarations |      54 |             56 | Slightly reduced                          |
| Box-shadow declarations           |      86 |             87 | Slightly reduced                          |
| Unique box-shadow declarations    |      40 |             52 | Reduced                                   |
| Legacy Profile style hits         |       0 |        Present | Cleared                                   |

Note: spacing was rescanned with a broader matcher than the old audit, so the raw spacing total is not directly comparable. It should not be used as the main success signal for this pass.

## High-Frequency Variables

| Variable                           | Count | Read                              |
| ---------------------------------- | ----: | --------------------------------- |
| `var(--color-muted)`               |   115 | Main secondary text role          |
| `var(--color-heading)`             |   105 | Main title role                   |
| `var(--color-brand-primary)`       |   100 | Primary action/selected role      |
| `var(--font-caption)`              |    77 | Metadata/chip role now common     |
| `var(--color-border)`              |    75 | Card/sheet/control containment    |
| `var(--color-text)`                |    50 | Body copy role                    |
| `var(--color-brand-primary-faint)` |    47 | Soft selected/chip surfaces       |
| `var(--color-surface-solid)`       |    46 | Solid card/action surface         |
| `var(--font-body)`                 |    41 | Body/input role                   |
| `var(--color-brand-primary-line)`  |    41 | Primary soft border role          |
| `var(--color-surface-glass)`       |    38 | Floating/glass surface role       |
| `var(--font-title)`                |    38 | Card/section title role           |
| `var(--radius-pill)`               |    38 | Chip/CTA/nav shape                |
| `var(--radius-lg)`                 |    37 | Search/control/compact card shape |
| `var(--color-brand-primary-soft)`  |    36 | Soft primary fill                 |

The top variables now match `DESIGN.md` roles. This is the main sign that the style system is converging.

## File Concentration

| File                                                                   | Raw colors | Variable refs | Read                                                                        |
| ---------------------------------------------------------------------- | ---------: | ------------: | --------------------------------------------------------------------------- |
| `src/pages/Home/Home.module.less`                                      |        108 |           165 | Still highest raw-color file, mostly page-local illustration and visual art |
| `src/styles/variables.less`                                            |         51 |             9 | Expected global token source                                                |
| `src/pages/Match/components/GradientVisual/GradientVisual.module.less` |         37 |             0 | Match decorative visual, protected baseline-adjacent                        |
| `src/pages/Map/Map.module.less`                                        |         29 |           133 | Map rendering/overlay styles, protected baseline                            |
| `src/components/MbtiEntryModal/MbtiEntryModal.module.less`             |          8 |            23 | Small shared modal, already token-leaning                                   |
| `src/pages/Mbti/components/IdentityCard/IdentityCard.module.less`      |          7 |            25 | MBTI ceremony/identity visual                                               |
| `src/pages/Bottle/Bottle.module.less`                                  |          6 |           112 | Baseline page, already token-leaning                                        |
| `src/pages/Mbti/components/Welcome/Welcome.module.less`                |          5 |             7 | MBTI illustration/welcome area                                              |
| `src/components/BottomNav/BottomNav.module.less`                       |          4 |             5 | Shared navigation, low drift                                                |

Profile no longer appears in the highest raw-color concentration group except tiny setting/toggle files. That is a meaningful improvement from the previous audit.

## Page Judgement

### Home

Status: migrated for shared UI, still contains local decorative art.

Home no longer needs a broad token pass for search, cards, CTA, panel, text roles, or main surfaces. Its remaining raw colors mostly belong to illustration-like elements: banner scenery, quick-action glyph drawings, recommendation visuals, avatars, and bottle/partner mini art.

Do not promote those decorative colors into global tokens. If Home still feels inconsistent in the browser, fix the visible product composition directly: spacing, density, icon treatment, weather pill, emoji-like markers, and section rhythm.

### Profile

Status: old lavender system removed; ready for visual QA.

Profile is no longer blocked by the old hardcoded lavender values. The next Profile work should be visual inspection rather than another mechanical replacement pass. Focus on whether its cards, sheets, empty states, toggles, and detail pages feel coherent in the running app.

### Map / Match / Bottle

Status: keep protected.

Map and Match still contain page-local rendering or adapter values by design. Bottle is already token-leaning. Do not rewrite these just to reduce counts.

### MBTI / Shared Modal / BottomNav

Status: not a blocker.

These areas have some remaining page-local visual values, but they are not currently the largest source of product inconsistency. Touch them only when a concrete visual issue is found.

## Next Decision

Do not continue with broad style migration as the next default task.

2026-06-21 update: the first targeted follow-up has started with a Bottle base-component pilot. `PageTopBar`, `BaseBottomSheet`, and `EmptyState` now cover generic Bottle shell patterns while business-specific Bottle UI remains page-local.

The next task should be a product-level visual QA pass:

1. Run the app locally.
2. Inspect Home and Profile at 375px width.
3. Record visible issues: text hierarchy, clipping, cramped cards, emoji/icon inconsistency, bottom navigation overlap, sheet readability, and whether the first screen feels like one product.
4. Make targeted fixes from that visual list.

If screenshot or repeatable browser verification is requested, follow `docs/webapp-testing-guide.md` and keep artifacts under ignored `.venv/` paths. Otherwise, manual local visual inspection is enough for the next pass.

## Final Judgement

The style-system migration phase is far enough along. Continuing to chase raw counts would mostly hit illustration colors and protected baseline pages.

Next work: visual QA and targeted product polish, not another blanket token sweep.
