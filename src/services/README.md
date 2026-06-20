# services

Place request wrappers and data-access functions here when API calls appear.
Do not call `axios` or `fetch` directly from routed pages once shared requests
exist. Pages should call service functions and let the service decide where the
data comes from.

Current lightweight migration boundary:

- `matchService.ts`: returns Match page mode/content/result data. Without
  `VITE_API_BASE_URL`, it reads local mock data internally. With
  `VITE_API_BASE_URL`, it requests the `server/` mock API and adapts the
  response for the page.
- `bottleService.ts`: returns Bottle page list/config data. Without
  `VITE_API_BASE_URL`, it reads local mock data internally. With
  `VITE_API_BASE_URL`, it requests the `server/` mock API and keeps page code
  independent from backend URL details.

`server/` mock data and frontend mock data are currently duplicated on purpose:
the backend boundary is isolated first, and shared contracts or seed data can be
extracted later if the API surface continues to grow.
