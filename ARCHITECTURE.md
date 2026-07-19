# Architecture

## High-Level Architecture

```
Client (React)
      ↓
REST API (Express)
      ↓
Service Layer
      ↓
Repository Layer
      ↓
   MongoDB
      ↓
Google Gemini API
```

## Project Structure

- `backend/`
  - `src/app.ts` — Express app setup, middleware, and route registration
  - `src/server.ts` — Server bootstrap and MongoDB connection
  - `src/routes/` — Route definitions for auth, documents, AI, history, dashboard
  - `src/controllers/` — Request handlers that call service layer methods
  - `src/services/` — Business logic for auth, document processing, AI, history, and dashboard
  - `src/repositories/` — MongoDB data access abstractions
  - `src/models/` — Mongoose schemas for users, documents, conversations
  - `src/middleware/` — Auth, validation, upload, error handling
  - `src/utils/` — Common helpers and API response formatting

- `frontend/`
  - `src/main.tsx` — React app entry point
  - `src/App.tsx` — Routes and layout wrapper
  - `src/context/AuthContext.tsx` — Auth state, login/register/logout, token persistence
  - `src/components/` — Layout, navigation, and route protection
  - `src/api/` — Axios client and auth API wrappers
  - `src/pages/` — Home, login, register, dashboard, documents, AI, history, fallback page
  - `src/index.css` — Base app styling

## Database Design

- `User`
  - `name`, `email`, `password`, timestamps
  - Passwords are hashed with bcrypt before storage

- `Document`
  - `title`, `content`, `userId`, `fileName`, `fileType`, `mimeType`, `size`, `metadata`
  - Content is extracted from PDF, Markdown, or text uploads

- `Conversation`
  - `userId`, `documentId`, `question`, `answer`, timestamps
  - Stores AI interaction history for auditability and dashboard metrics

## Authentication Approach

- JWT tokens are generated on login/register and returned to the client
- Tokens are signed using `JWT_SECRET` and checked by backend middleware
- Protected endpoints require authentication and verify resource ownership
- Frontend stores auth state in `localStorage` and attaches the bearer token to API requests

## Major Engineering Decisions

- Layered architecture separates controllers, services, and repositories for maintainability
- Document content is stored in MongoDB so AI prompts can be constructed directly from DB text
- Axios interceptor centralizes API auth headers and base URL configuration
- React router protects authenticated pages and redirects unauthenticated users
- Tailwind CSS powers a responsive dark UI with glass cards, loading/empty/error states, and document preview
- Server-side search/filter for documents and conversation history
- Alias REST endpoints (`/signup`, `/login`, `/ask`) match assessment suggestions while keeping existing routes

## Improvements and Scaling

- Add pagination for document and history lists
- Stream AI responses in real time
- Add role-based access control and multi-user workspaces
- Add unit and integration tests for backend and frontend
- Add end-to-end tests for backend and frontend
- Use object storage for large document uploads instead of keeping all content in MongoDB
- Cache AI results or use embeddings for better performance and relevance
