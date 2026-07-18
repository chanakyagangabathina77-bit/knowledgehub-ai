# AI Usage

## AI Tools Used

- GitHub Copilot / ChatGPT-like assistant (AI code assistance)
- Google Gemini API via the `@google/genai` Node.js SDK for document question answering

## How AI Was Used

- Generated frontend React page layouts, API client logic, and component structure
- Helped design backend service/controller/repository patterns
- Provided guidance on JWT authentication, request validation, and document upload handling
- Assisted in writing documentation and debugging TypeScript issues

## Example Prompts

- "Create a React/Vite frontend with protected routes, auth context, and file upload pages."
- "Write an Express middleware that verifies JWT tokens and attaches user info to requests."
- "Design a MongoDB schema for users, documents, and AI conversation history."

## AI-Generated Code

- Frontend page components, authentication context, API client, and styling
- Backend controller and service scaffolding for auth, documents, AI, history, and dashboard
- Documentation content for README, ARCHITECTURE.md, DEBUG_NOTES.md, and AI_USAGE.md

## Modifications and Verification

- All AI-generated code was reviewed and adjusted manually
- Verified with `npm run build` in the frontend and `npx tsc --noEmit` in the backend
- Fixed type issues caused by Vite/TypeScript `verbatimModuleSyntax` and Axios header typing

## Incorrect Suggestions

- Some AI suggestions initially used invalid TypeScript imports under `verbatimModuleSyntax`
- Axios request header assignment required a type-safe workaround
- Existing frontend file structure was missing, so the app had to be implemented from scratch

## Final Note

AI was used as a productivity aid, but every line in this repository was reviewed and adapted to fit the project requirements.
