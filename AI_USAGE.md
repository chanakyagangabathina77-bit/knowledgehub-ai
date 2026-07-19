# AI Usage

## AI Tools Used

- OpenAI ChatGPT (GPT-5.5) for architecture guidance, code generation, debugging assistance, documentation drafting, and project planning.
- Google Gemini API (`@google/genai`) for the application's AI-powered document question answering.

## How AI Was Used

AI was primarily used to:

- Generate initial code scaffolding
- Refactor backend architecture
- Produce boilerplate React components
- Debug TypeScript compilation issues
- Generate documentation drafts
- Suggest implementation approaches for JWT authentication, file upload, and AI integration

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
