# TripKin Design System

This document is the source of truth for TripKin visual decisions. It is written for human developers and AI agents working in this repository.

TripKin is a mobile-first travel exploration product. The protected visual baseline is the current direction shown by the Map, Match, and Bottle pages: light glass surfaces, primary purple emphasis, soft travel information cards, and mobile H5 interaction patterns.

This document does not redesign the product. It turns the approved design decisions into stable rules so future work stays visually consistent.

## 1. Design Principles

1. Preserve the baseline pages.
   Map, Match, and Bottle define the current product look. Visual consistency work must not change their visible output unless a specific task asks for it.

2. Improve consistency before changing appearance.
   When a style already matches the baseline, prefer aliasing it to a token or documenting it before replacing values.

3. Use semantic roles, not historical values.
   A token is valid only when it has a clear visual purpose. Do not keep values just because they already exist in one page.

4. Keep the product native to TripKin.
   Do not imitate external brands, design systems, or visual languages. Reference repositories may be used for document structure only.

5. Keep page personality inside shared rules.
   Home can feel more like an entry point, and MBTI can feel more ceremonial, but shared controls, cards, sheets, chips, and navigation must follow this document.

6. Avoid speculative abstraction.
   Do not create new shared components, new token scales, or new visual systems just because reuse might happen later.

7. Optimize for AI consistency.
   Future agents should rarely need to choose between similar values. If a choice is unclear, use the component specification in this document.

## 2. Color System

TripKin uses a light travel palette led by primary purple, supported by soft glass surfaces and semantic accent colors.

### Brand Colors

Use the primary brand colors for:

- Main actions.
- Selected states.
- Active navigation.
- Key route or destination emphasis.
- Focus states and interactive highlights.

Do not use primary purple as a large background fill unless the baseline page already does so. Large surfaces should stay light, soft, and breathable.

### Accent Colors

Use companion orange only for travel companion, social, or joining intent.

Use hotspot pink only for hotspot, activity, or attention metadata.

Use success green only for positive status, availability, completion, or confirmation.

Do not invent a new accent color for a single page. If a feature needs a new semantic color, it must be confirmed before implementation.

### Text Colors

Use heading color for primary titles and important labels.

Use body text color for normal descriptive copy.

Use muted text color for metadata, helper copy, secondary labels, timestamps, and inactive labels.

Use placeholder color only for empty input states and skeleton-like hints.

Do not create page-local text colors that duplicate heading, body, muted, or placeholder roles.

### Surface Colors

Use solid surface for normal list cards and dense content.

Use glass surface for floating cards, map controls, bottom navigation, search bars, and lightweight overlays.

Use strong glass surface when text readability is more important than background transparency.

Use soft surface for grouped internal blocks inside cards, empty states, and low-emphasis panels.

Do not use very transparent glass in light mode if text contrast or border visibility becomes weak.

### Page Backgrounds

Page backgrounds may vary by route, but they must remain within the approved light travel direction.

Map, Match, and Bottle backgrounds are baseline references. Profile and Home should migrate toward the same family of light gradients and soft atmospheric color.

Do not infer new page backgrounds from old placeholder pages.

### Borders And Dividers

Use soft borders for card edges, controls, sheets, and subtle separation.

Use stronger borders only when an element needs clearer containment or selected-state contrast.

Use dividers only for internal grouping, not decorative section framing.

### Local Decorative Color

Page-local decorative color is allowed only for:

- Map rendering internals.
- Home illustrations.
- MBTI result or welcome illustrations.
- Static visual art that is not reused as a UI pattern.

Decorative values must not become new product tokens.

## 3. Typography System

These typography tokens are final. Do not rename them, add new typography tokens, or change their values.

| Token          | Value | Use                                                             |
| -------------- | ----: | --------------------------------------------------------------- |
| `font-micro`   |  10px | tiny badges, dense map labels, compact counters                 |
| `font-caption` |  12px | chips, metadata, bottom navigation labels, helper text          |
| `font-body`    |  14px | default body copy, inputs, descriptions                         |
| `font-title`   |  16px | card titles, section titles, compact modal titles               |
| `font-heading` |  20px | page titles, primary sheet titles, important empty-state titles |
| `font-display` |  24px | hero headings, identity moments, MBTI result emphasis           |

### Typography Rules

Use `font-body` when unsure. Most readable product copy should be body-sized.

Use `font-caption` for secondary information that should not compete with card titles.

Use `font-title` for repeated titles inside cards and sections.

Use `font-heading` for the main title of a page or sheet.

Use `font-display` sparingly. It is for the first-screen identity moment, not normal section hierarchy.

Do not use fractional font sizes.

Do not create one-off font sizes for a single component unless it is a map SVG rendering detail or illustration label.

## 4. Spacing System

These spacing tokens are final. Do not rename them, add new spacing tokens, or change their values.

| Token          | Value | Use                                                   |
| -------------- | ----: | ----------------------------------------------------- |
| `space-0`      |     0 | reset, no spacing                                     |
| `space-1`      |   4px | micro spacing, tight icon-text pairing                |
| `space-2`      |   8px | small gaps, compact vertical rhythm                   |
| `space-3`      |  12px | standard internal gaps                                |
| `space-4`      |  16px | default card padding and grouped content padding      |
| `space-5`      |  20px | section separation and roomy internal rhythm          |
| `space-6`      |  24px | large section spacing, modal and sheet breathing room |
| `space-page-x` |  18px | default mobile page horizontal padding                |

### Spacing Rules

Use `space-page-x` for main page gutters unless preserving a baseline page requires an existing equivalent value.

Use `space-4` as the default card padding.

Use `space-3` as the default gap inside card content.

Use `space-2` for compact repeated controls, icon rows, and metadata groups.

Use `space-5` or `space-6` for major vertical separation.

Do not introduce `10px`, `14px`, `18px`, or `22px` as new generic spacing tokens. Choose the closest approved token by semantic role.

Safe-area offsets are layout requirements, not spacing tokens. They may be used where required for bottom navigation, sheets, or device-safe padding.

## 5. Radius System

These radius tokens are final. Do not rename them, add new radius tokens, or change their values.

| Token          | Value | Use                                              |
| -------------- | ----: | ------------------------------------------------ |
| `radius-sm`    |   8px | small media, tiny blocks, compact inner elements |
| `radius-md`    |  12px | inputs, small cards, inner media corners         |
| `radius-lg`    |  16px | controls, search bars, compact floating cards    |
| `radius-xl`    |  22px | default travel information cards                 |
| `radius-sheet` |  28px | modals and bottom sheet containers               |
| `radius-pill`  | 999px | chips, pills, rounded CTAs, nav indicators       |

### Radius Rules

Use `radius-xl` for standard travel information cards.

Use `radius-lg` for search bars, compact controls, and smaller floating cards.

Use `radius-md` for inputs and internal media.

Use `radius-sheet` for modals and bottom sheets.

Use `radius-pill` only when the shape is intentionally pill-like.

Use `50%` directly for true circles such as avatars, dots, and circular icons. It is a shape rule, not a design token.

Do not create component-specific radius tokens.

Do not promote decorative or illustration border-radius values into the design system.

## 6. Shadow System

TripKin shadows should feel soft, mobile, and light. Shadows add separation; they should not create a heavy desktop dashboard feel.

### Shadow Roles

Use soft card shadow for normal content cards, compact panels, and repeated list items.

Use standard card shadow for stronger cards that need clear elevation.

Use floating shadow for map overlays, floating search, bottom navigation, and elevated controls.

Use primary shadow only for primary CTAs or selected primary actions.

Use popup shadow for modals and bottom sheets.

Use inset light only as part of glass-card depth.

### Shadow Rules

Do not create page-local shadow systems.

Do not keep Profile lavender shadows as permanent system shadows.

Do not use strong glow shadows for ordinary cards.

Do not use text shadows for normal UI text. Map heat labels may keep local text-shadow rules if needed for readability.

## 7. Component Specifications

These are preferred styling patterns. They do not require extracting shared components immediately. Page-local CSS Modules should still follow these patterns.

### Button

Radius: primary CTAs use `radius-pill`; compact action buttons use `radius-lg`.

Spacing: main buttons use `space-4` horizontal rhythm or larger when needed for touch comfort.

Typography: use `font-body` for normal buttons and `font-title` only for high-emphasis CTAs.

Shadow: primary CTAs may use primary shadow; secondary buttons should be flat or softly elevated.

Border: primary buttons do not need borders; secondary buttons use a soft border or primary line.

Surface: primary buttons use primary gradient or primary surface. Secondary buttons use soft surface, glass surface, or primary faint background.

### Input

Radius: use `radius-md` or `radius-lg`.

Spacing: use `space-3` or `space-4` horizontal padding.

Typography: use `font-body`.

Shadow: avoid shadow inside normal forms; use soft card shadow only when the input floats above content.

Border: use soft border by default and primary line for focus.

Surface: use soft surface or strong glass surface.

### Search Bar

Radius: use `radius-lg`.

Spacing: use `space-3` or `space-4` horizontal padding.

Typography: use `font-body`.

Shadow: use floating or soft card shadow when search is fixed or overlaid.

Border: use glass border or soft border.

Surface: use strong glass surface when floating over maps or gradients.

### Chip

Radius: use `radius-pill`.

Spacing: use `space-2` to `space-3` internal rhythm.

Typography: use `font-caption`.

Shadow: no shadow by default.

Border: default chips use soft border; selected chips use primary line.

Surface: default chips use glass or soft surface; selected chips use primary soft or primary faint surface.

### Card

Radius: use `radius-xl` for standard travel cards and `radius-lg` for compact floating cards.

Spacing: use `space-4` internal padding and `space-3` internal gap.

Typography: card title uses `font-title`; body uses `font-body`; metadata uses `font-caption`.

Shadow: use soft card shadow for lists; use floating shadow only for overlays.

Border: use soft border or glass border.

Surface: use solid surface for dense list cards and glass surface for floating/map cards.

### Modal

Radius: use `radius-sheet`.

Spacing: use `space-5` or `space-6` internal padding.

Typography: title uses `font-heading`; body uses `font-body`; actions use `font-body` or `font-title` by emphasis.

Shadow: use popup shadow.

Border: use no border unless glass readability needs a soft border.

Surface: use solid surface or strong glass surface.

### Bottom Sheet

Radius: use `radius-sheet` on top corners; bottom corners remain flush with the viewport.

Spacing: use `space-5` or `space-6` horizontal and bottom rhythm, plus safe-area bottom padding.

Typography: title uses `font-title` or `font-heading`; body uses `font-body`; metadata uses `font-caption`.

Shadow: use popup shadow.

Border: use top soft border or glass border.

Surface: use solid surface for content-heavy sheets and strong glass surface for map overlays.

### Navigation Bar

Radius: use `radius-pill` or a large floating container shape that visually behaves like a pill.

Spacing: use safe-area bottom handling and evenly spaced items.

Typography: use `font-caption`.

Shadow: use floating shadow.

Border: use glass border.

Surface: use strong glass surface.

### Tab Bar

Radius: use `radius-pill` for the container and active indicator.

Spacing: use `space-1` or `space-2` internal container padding.

Typography: use `font-body` for tab text; use `font-caption` only for dense tabs.

Shadow: active tab may use soft shadow; container should stay light.

Border: use soft border.

Surface: container uses glass or soft surface; active tab uses solid surface or primary soft surface.

### Empty State

Radius: use `radius-xl` when the empty state is inside a card. Full-page empty states do not need a card by default.

Spacing: use `space-5` or `space-6`.

Typography: title uses `font-heading` or `font-title`; body uses `font-body`.

Shadow: use soft card shadow only when carded.

Border: use dashed or soft primary line only for recoverable empty/error states.

Surface: use solid or soft surface.

## 8. Do Rules

- Do read this document before styling TripKin pages.
- Do treat Map, Match, and Bottle as the protected visual baseline.
- Do preserve visual output on baseline pages.
- Do use approved typography, spacing, and radius tokens exactly as named.
- Do use existing TripKin color and shadow roles semantically.
- Do prefer token aliasing before replacement when a baseline value already looks correct.
- Do keep page-local decoration local.
- Do keep normal page work inside the page directory unless reuse is confirmed.
- Do use CSS Modules for page and component styles.
- Do check 375px mobile width after visual changes.

## 9. Don't Rules

- Do not redesign the product while doing consistency work.
- Do not imitate external brands or design systems.
- Do not add typography, spacing, or radius tokens.
- Do not rename approved tokens.
- Do not create a permanent Profile-only or page-only visual system.
- Do not spread `--lv-*` variables into new work.
- Do not rewrite Map, Match, or Bottle just to make token names cleaner.
- Do not replace baseline page values when aliasing can preserve output.
- Do not turn decorative Home, MBTI, or Map art values into global tokens.
- Do not introduce new UI libraries or scaling systems for visual consistency work.

## 10. Migration Guidance

### Priority Order

1. Profile.
2. Home.
3. Bottle.
4. Match.
5. Map.
6. MBTI.

### Profile

Profile is the first migration target because it contains the largest style drift. Migrate its private lavender system into TripKin baseline semantics.

Start by aliasing existing Profile values to baseline roles where possible. Do not change layout or product structure as part of token migration.

### Home

Home is the second migration target because it has many hardcoded values and is the first product impression.

Preserve its entry-page personality. Align shared UI patterns such as search, quick actions, cards, chips, buttons, and text hierarchy. Keep illustration and decorative atmosphere local.

### Bottle

Bottle already matches the baseline closely. Only align spacing, radius, card, sheet, and chip patterns when visual output can be preserved.

### Match

Match is part of the baseline. Its page-local token adapter is acceptable while global tokens settle.

Do not remove Match-specific aliases until equivalent global semantics are stable and the visual output remains unchanged.

### Map

Map is part of the baseline and has special rendering needs. Preserve map internals.

Only align shared overlays, search, chips, controls, sheets, and toasts when appearance stays consistent.

### MBTI

MBTI can keep more ceremony than the main utility pages. Align common buttons, sheets, cards, text hierarchy, and empty states. Keep result illustration and identity presentation local.

## 11. Agent Prompt Guide

Use this guide when asking Codex, Claude Code, Cursor, or another AI agent to style TripKin.

### Required Agent Context

Before styling TripKin, read:

- `AGENTS.md`
- `README.md`
- `docs/coding-guide.md`
- `docs/collaboration-guide.md`
- `DESIGN.md`

### Copy-Ready Agent Prompt

You are working on TripKin, a mobile-first travel exploration H5 product. Before changing styles, read `DESIGN.md` and follow it as the visual source of truth.

Map, Match, and Bottle are the protected visual baseline. Preserve their visual output. Profile and Home may be migrated toward the baseline, but do not redesign the product.

Use the approved typography, spacing, and radius tokens exactly as named. Do not add token scales, rename tokens, or invent page-specific design systems. For baseline pages, prefer token aliasing before replacing values. Keep decorative page art local and do not promote it into global tokens.

Make visual consistency improvements only within the requested scope. Do not introduce a new UI library, responsive scaling system, external brand style, or speculative shared component.

### Agent Review Checklist

Before completing styling work, confirm:

- The work preserves Map, Match, and Bottle appearance unless explicitly requested otherwise.
- No new typography, spacing, or radius tokens were created.
- No permanent page-specific visual system was added.
- Shared controls follow the component specifications in this document.
- Page-local decoration remains local.
- The page remains usable at 375px width without horizontal overflow.
