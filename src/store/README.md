# store

Place Zustand stores here only for state shared across pages.
Do not move small local UI state into global store.
Name stores by domain, for example `useTripStore.ts`.

- `useTripStore.ts`: shared travel session state such as MBTI result and destination.
- `useMatchStore.ts`: shared Match entry context and selected Match mode across pages.
