# components

Place cross-page reusable UI components here.
Do not put page-only layout blocks or business flows in this directory.
Use English PascalCase folder names, for example `IdentityCard/index.tsx`.

- `BottomNav/`: shared four-tab bottom navigation UI for Home, Map, Match, and Profile. Visibility should be controlled by app layout, not page-level imports.
- `MbtiEntryModal/`: shared MBTI entry modal for explicit page-level persona CTAs before entering `/mbti`; it is not owned by BottomNav.
- `PageTopBar/`: shared mobile page top bar shell for back navigation, centered title, and an optional right-side action slot. It uses the shared icon source for the generic back affordance. Keep page-specific copy and actions in the page.
- `BaseBottomSheet/`: shared antd-mobile `Popup`-backed bottom sheet shell for mask behavior, drag handle, close button, modal semantics, scrolling, and safe-area padding. Keep sheet content and business behavior page-local.
- `EmptyState/`: shared empty/loading/error state block with title, description, and an optional action. Keep page-specific recovery logic in the page.
