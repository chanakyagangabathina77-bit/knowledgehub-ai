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

## Issue 4: Empty Documentation Files

- Problem: Required assessment docs were placeholders and not filled.
- Root Cause: Documentation had not yet been completed for the assignment.
- Investigation: Read `AI_USAGE.md`, `DEBUG_NOTES.md`, and `ARCHITECTURE.md` and confirmed they were empty.
- Solution: Added thorough documentation describing AI usage, architecture, debugging, and design decisions.
