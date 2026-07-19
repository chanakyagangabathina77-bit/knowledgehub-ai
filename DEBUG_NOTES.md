# Debug Notes

## Issue 1: Missing Frontend Source Files

- Problem: The frontend `src` folder was present, but key app files like `App.tsx`, `main.tsx`, and page components were empty.
- Root Cause: The initial scaffold did not include the completed React app implementation.
- Investigation: Inspected `frontend/src` and saw only empty files plus placeholder directories.
- Solution: Implemented the full frontend app, including routing, authentication, pages, API client, and styling.

## Issue 2: TypeScript `verbatimModuleSyntax` Import Errors

- Problem: Build errors occurred because type-only imports were not marked as `import type`.
- Root Cause: Vite/TSC config enabled `verbatimModuleSyntax`, requiring explicit type-only imports for exported types.
- Investigation: Read compiler output and identified import errors in `src/api/auth.ts`, `src/context/AuthContext.tsx`, and `src/components/Layout.tsx`.
- Solution: Updated imports to use `import type` for types and corrected the React children annotation.

## Issue 3: Axios Request Header Typing

- Problem: Axios request interceptor failed type checking when assigning `config.headers`.
- Root Cause: Axios type definitions differ between `AxiosRequestHeaders` and the plain object shape used in the interceptor.
- Investigation: Rebuilt the frontend and inspected the exact TypeScript error in `src/api/client.ts`.
- Solution: Cast headers safely with `as any` after merging existing headers and the authorization token.

## Issue 4: Backend Route Resolution

- Problem: API requests returned 404 after deployment.
- Root Cause: Backend routes were mounted differently between local and production environments.
- Investigation: Compared Express route configuration and deployment logs.
- Solution: Added root API mapping and standardized route registration for both local development and production deployment.

## Issue 5: Synchronous Authentication State Initialization

- Problem: When refreshing protected pages (like `/dashboard`), the user was briefly shown the login page or redirected to the login screen, even with a valid session in `localStorage`.
- Root Cause: Auth state was initialized to `null` and loaded asynchronously on mount in a `useEffect`. During the first render, `isAuthenticated` was `false`, causing the route protector to trigger a redirect.
- Solution: Changed `useState` in `AuthContext.tsx` to read from `localStorage` synchronously during state initialization, preventing any incorrect redirections.

## Issue 6: Case Sensitivity and Whitespace in Email Lookups

- Problem: Registration or login failed when emails contained mixed casing or leading/trailing spaces, throwing server errors or validation errors.
- Root Cause: Mongoose schema trimmed and lowercased emails upon saving, but MongoDB find queries (like `findOne`) do not automatically run setters on criteria. Lookups were done with the raw user input, failing to match.
- Solution: Normalized the email parameter using `.trim().toLowerCase()` in the repository query lookups in `user.repository.ts`, and updated the backend validation rules.

## Issue 7: Axios Request Path Resolution and Route Mismatches

- Problem: Clicking login/register resulted in a 404 "Route /auth/register not found" error when the backend base URL did not end in `/api`.
- Root Cause: Axios combines base URL and requested path. If the base URL was set without the `/api` suffix, the requests were routed to `/auth/register` instead of `/api/auth/register`.
- Solution: Mounted the backend API router under both `/api` and `/` paths in `app.ts` as a robust fallback.
