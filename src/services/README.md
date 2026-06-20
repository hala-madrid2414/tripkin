# services

Place request wrappers and data-access functions here when API calls appear.
Do not call `axios` directly from routed pages once shared requests exist.
Keep service files named by domain, for example `matchService.ts`.

Current lightweight migration boundary:

- `matchService.ts`: returns Match page mode/content/result data. It currently
  reads local mock data internally and can later swap to API requests.
- `bottleService.ts`: returns Bottle page list/config data. It currently reads
  local mock data internally and can later swap to API requests.
