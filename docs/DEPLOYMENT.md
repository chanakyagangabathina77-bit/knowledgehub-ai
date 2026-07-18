# Deployment Guide

This guide outlines the deployment options, configurations, and environment setups for **KnowledgeHub AI**.

---

## 1. Local Deployment (Standard Setup)

### Prerequisites
- **Node.js** v18 or later
- **MongoDB** running locally (or a remote MongoDB Atlas URI)

### Step-by-Step Setup

1. **Clone & Navigate** to the project directory.
2. **Backend Setup**:
   - Navigate to `/backend`.
   - Install dependencies: `npm install`.
   - Create a `.env` file based on the environment configurations:
     ```env
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/knowledgehub-ai
     JWT_SECRET=your_secure_jwt_secret_key
     JWT_EXPIRES_IN=7d
     GEMINI_API_KEY=YOUR_GOOGLE_GEMINI_API_KEY
     GEMINI_MODEL=models/gemini-2.5-flash
     ENABLE_STARTUP_LOGS=true
     ENABLE_HTTP_LOGS=true
     ```
   - Run the development server: `npm run dev`.

3. **Frontend Setup**:
   - Navigate to `/frontend`.
   - Install dependencies: `npm install`.
   - Create a `.env` file if you wish to override the default backend URL:
     ```env
     VITE_API_BASE_URL=http://localhost:5000/api
     ```
   - Start the Vite development server: `npm run dev`.
   - Open `http://localhost:5173` in your browser.

---

## 2. Production Cloud Deployment

### Database: MongoDB Atlas
1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database).
2. Create a database user with read/write privileges.
3. Whitelist access from all IPs (`0.0.0.0/0`) or configure specific IP access if your hosting platform has static IPs.
4. Copy the connection string (e.g., `mongodb+srv://<user>:<password>@cluster.mongodb.net/...`).

### Backend: Render / Railway / Heroku
1. Connect your GitHub repository to the hosting platform (e.g., Render Web Service).
2. Set the root directory to `backend`.
3. Set the build command to `npm install && npm run build`.
4. Set the start command to `npm start` (which runs `node dist/server.js`).
5. Configure the Environment Variables in the service settings:
   - `PORT`: `5000` (or leave to automatic port assignment)
   - `MONGODB_URI`: `<your MongoDB Atlas URI>`
   - `NODE_VERSION`: `20` (Critical: required by `@google/genai` and mongoose)
   - `JWT_SECRET`: `<secure production secret>`
   - `JWT_EXPIRES_IN`: `7d`
   - `GEMINI_API_KEY`: `<your production Google Gemini API key>`
   - `GEMINI_MODEL`: `models/gemini-2.5-flash`
   - `NODE_ENV`: `production`

### Frontend: Vercel / Netlify
1. Connect the repository to Vercel or Netlify.
2. Set the root directory to `frontend`.
3. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Set Environment Variables:
   - `VITE_API_BASE_URL`: `https://your-backend-render-url.onrender.com/api`
5. **SPA Routing Rule**: Since this is a React Router SPA, configure redirects so that all route requests fallback to `index.html`.
   - **For Vercel (`vercel.json`)**:
     ```json
     {
       "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
     }
     ```
   - **For Netlify (`_redirects` file in public folder)**:
     ```text
     /*   /index.html   200
     ```

---

## 3. Production Checklist
- [ ] **Security**: Change all default passwords and secret keys. Do not commit `.env` files to Git.
- [ ] **CORS Settings**: Restrict backend CORS middleware (`backend/src/app.ts`) to allow requests only from your production frontend domain.
- [ ] **API Fallbacks**: Ensure that a valid Google Gemini API key is supplied, or verify that the local keywords-based summarizer fallback behaves gracefully for heavy usage.
- [ ] **Web Server Headers**: Ensure security headers (HSTS, X-Frame-Options) are configured.
