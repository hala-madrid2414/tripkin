# components

Place cross-page reusable UI components here.
Do not put page-only layout blocks or business flows in this directory.
Use English PascalCase folder names, for example `IdentityCard/index.tsx`.

- `BottomNav/`: shared four-tab bottom navigation UI for Home, Map, Match, and Profile. Visibility should be controlled by app layout, not page-level imports.
- `MbtiEntryModal/`: shared MBTI entry modal for explicit page-level persona CTAs before entering `/mbti`; it is not owned by BottomNav.
