# BottomNav Layout And Back Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move global bottom navigation into `AppLayout`, remove it from non-tab pages, and make cross-route back buttons return to browser history with safe fallbacks.

**Architecture:** `AppLayout` owns whether `BottomNav` appears and reads destination context from the existing trip store. Page components keep their business UI but no longer mount the global nav. Cross-route back buttons use a small shared navigation helper so direct URL entry falls back to a known route.

**Tech Stack:** React, TypeScript, React Router, Zustand, Less CSS Modules, local Python Playwright via `webapp-testing`.

---

### Task 1: Add Regression Smoke Script

**Files:**

- Create: `.venv/webapp-tests/navigation_layout_back_smoke.py`

- [ ] **Step 1: Write the browser smoke test**

Create a temporary Playwright script under `.venv/webapp-tests/` that verifies:

- `/`, `/map`, `/match`, and `/profile` show `nav[aria-label="主导航"]`.
- `/mbti`, `/mbti/test`, `/mbti/result`, and `/bottle?dest=yunnan` do not show that nav.
- Bottle, Match, and MBTI back controls return to history when possible and fallback to `/map` or `/mbti` on direct entry.
- Console errors fail the script.

- [ ] **Step 2: Verify the script fails before implementation**

Run:

```powershell
.\.venv\Scripts\python.exe C:\Users\hp\.codex\skills\webapp-testing\scripts\with_server.py --server "npm run dev" --port 5173 -- .\.venv\Scripts\python.exe .venv\webapp-tests\navigation_layout_back_smoke.py
```

Expected before implementation: failure because MBTI and Bottle still show bottom nav and some back controls use fixed links.

### Task 2: Add AppLayout

**Files:**

- Create: `src/layouts/AppLayout/index.tsx`
- Create: `src/layouts/AppLayout/AppLayout.module.less`
- Modify: `src/App.tsx`

- [ ] **Step 1: Implement `AppLayout`**

`AppLayout` renders children and only shows `BottomNav` on exact main tab paths: `/`, `/map`, `/match`, `/profile`.

- [ ] **Step 2: Wire `AppLayout` into `App.tsx`**

Wrap `AppRouter` with `AppLayout`.

### Task 3: Add Back Navigation Helper

**Files:**

- Create: `src/utils/navigation.ts`

- [ ] **Step 1: Implement helper**

Expose:

- `canNavigateBack()`
- `navigateBackOr(navigate, fallback)`

Use `window.history.state?.idx > 0` to decide whether `navigate(-1)` is safe.

### Task 4: Move BottomNav Out Of Pages

**Files:**

- Modify: `src/pages/Home/index.tsx`
- Modify: `src/pages/Map/index.tsx`
- Modify: `src/pages/Bottle/index.tsx`
- Modify: `src/pages/Match/index.tsx`
- Modify: `src/pages/Mbti/index.tsx`
- Modify: `src/pages/Profile/index.tsx`

- [ ] **Step 1: Remove page-level `BottomNav` imports and render calls**

All global bottom nav rendering should now come from `AppLayout`.

- [ ] **Step 2: Preserve destination context**

Map, Bottle, and Match write their current destination id to `useTripStore.setDestination`.

### Task 5: Fix Back Behavior And No-Nav Spacing

**Files:**

- Modify: `src/pages/Bottle/index.tsx`
- Modify: `src/pages/Match/index.tsx`
- Modify: `src/pages/Match/components/MatchTopBar/index.tsx`
- Modify: `src/pages/Mbti/index.tsx`
- Modify: `src/pages/Map/components/SearchBar.tsx`
- Modify: `src/pages/Mbti/Mbti.module.less`
- Modify: `src/pages/Bottle/Bottle.module.less`
- Modify: `src/pages/Profile/Profile.module.less`

- [ ] **Step 1: Replace fixed cross-route back links**

Bottle, Match, and MBTI result/test use `navigateBackOr`.

- [ ] **Step 2: Keep non-route close behavior unchanged**

Profile overlays continue using `onClose`.

- [ ] **Step 3: Adjust spacing**

MBTI and Bottle no longer reserve bottom nav space. Profile width aligns with the nav max width.

### Task 6: Verify

**Files:**

- No production file creation.

- [ ] **Step 1: Run lint**

```bash
npm run lint
```

- [ ] **Step 2: Run build**

```bash
npm run build
```

- [ ] **Step 3: Run touched-file Prettier check**

```bash
npx prettier --check src/App.tsx src/layouts/AppLayout/index.tsx src/layouts/AppLayout/AppLayout.module.less src/utils/navigation.ts src/pages/Home/index.tsx src/pages/Map/index.tsx src/pages/Bottle/index.tsx src/pages/Bottle/Bottle.module.less src/pages/Match/index.tsx src/pages/Match/components/MatchTopBar/index.tsx src/pages/Mbti/index.tsx src/pages/Mbti/Mbti.module.less src/pages/Profile/index.tsx src/pages/Profile/Profile.module.less docs/navigation-layout-migration.md
```

- [ ] **Step 4: Run webapp-testing smoke**

```powershell
.\.venv\Scripts\python.exe C:\Users\hp\.codex\skills\webapp-testing\scripts\with_server.py --server "npm run dev" --port 5173 -- .\.venv\Scripts\python.exe .venv\webapp-tests\navigation_layout_back_smoke.py
```

Expected after implementation: all checks pass.
