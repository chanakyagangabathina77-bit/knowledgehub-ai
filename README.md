# KnowledgeHub AI

KnowledgeHub AI is a full-stack application where authenticated users can upload documents, ask AI-powered questions about them, search conversation history, and track usage from a dashboard.

## Project Overview

This project was built for a Full Stack Developer technical assessment. It demonstrates:

- JWT authentication with protected APIs
- Document upload and management (PDF, Markdown, TXT)
- AI question answering using Google Gemini with local fallback
- Searchable chat history and document library
- Dashboard analytics
- Production-oriented backend layering and graceful error handling

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, TypeScript, Vite, Tailwind CSS, React Router, Axios |
| Backend | Node.js, Express, TypeScript, MongoDB, Mongoose |
| AI | Google Gemini API (`@google/genai`) |
| Auth | JWT + bcrypt password hashing |

## Setup Instructions

### Prerequisites

- Node.js 18+
- MongoDB running locally or a MongoDB Atlas connection string
- Google Gemini API key (optional — local fallback works without it)

### Backend

1. Open a terminal in `backend`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `backend/.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/knowledgehub-ai
   JWT_SECRET=your_secure_secret_here
   JWT_EXPIRES_IN=7d
   GEMINI_API_KEY=YOUR_GEMINI_API_KEY
   NODE_ENV=development
   ```
4. Start the backend:
   ```bash
   npm run dev
   ```

### Frontend

1. Open a terminal in `frontend`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Optional: create `frontend/.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
4. Start the frontend:
   ```bash
   npm run dev
   ```

## Running Locally

- Backend API: `http://localhost:5000/api`
- Frontend app: Vite dev server URL (typically `http://localhost:5173`)

## Environment Variables

| Variable | Location | Description |
| --- | --- | --- |
| `PORT` | backend | API port |
| `MONGODB_URI` | backend | MongoDB connection string |
| `JWT_SECRET` | backend | Secret for signing JWT tokens |
| `JWT_EXPIRES_IN` | backend | Token expiry duration |
| `GEMINI_API_KEY` | backend | Google Gemini API key |
| `NODE_ENV` | backend | Environment mode |
| `VITE_API_BASE_URL` | frontend | Backend API base URL |

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/signup` | Register user |
| POST | `/api/login` | Login user |
| POST | `/api/auth/register` | Register user (alias) |
| POST | `/api/auth/login` | Login user (alias) |
| GET | `/api/documents` | List documents (`?search=&fileType=`) |
| POST | `/api/documents` | Upload document |
| GET | `/api/documents/:id` | Preview document content |
| DELETE | `/api/documents/:id` | Delete document |
| POST | `/api/ask` | Ask AI question |
| POST | `/api/ai/ask` | Ask AI question (alias) |
| GET | `/api/history` | Conversation history (`?search=&documentId=`) |
| GET | `/api/dashboard` | Dashboard metrics |

## Design Decisions

- **Layered backend architecture**: Controllers, services, and repositories keep business logic testable and maintainable.
- **Document text in MongoDB**: Uploaded files are parsed server-side and stored as text so AI prompts can be built directly from stored content.
- **Gemini with fallback**: If the Gemini API is unavailable, quota-limited, or missing, the app falls back to a keyword-based local summarizer so Q&A still works.
- **Search via query params**: Documents and history support server-side filtering instead of loading everything into the browser.
- **JWT in localStorage**: Simple SPA auth flow with axios interceptors for token attachment and 401 logout handling.
- **Tailwind UI**: Modern dark theme with glass-style cards, responsive layout, loading/empty/error states, and document preview modal.

## Future Improvements

- Add pagination for documents and history
- Stream AI responses in real time
- Store files in object storage (S3) instead of inline MongoDB content
- Add embeddings + vector search for better answer relevance
- Add unit/integration tests and Docker Compose setup
- Deploy frontend and backend separately with CI/CD
- Add role-based access and team workspaces

## Additional Documentation

- [AI_USAGE.md](./AI_USAGE.md)
- [DEBUG_NOTES.md](./DEBUG_NOTES.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
