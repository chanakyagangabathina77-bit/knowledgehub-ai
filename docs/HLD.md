# High Level Design

High-Level Design (HLD)
KnowledgeHub AI – AI-Powered Knowledge Base Assistant
Field	Details
Document Type	High-Level Design (HLD)
Project Name	KnowledgeHub AI – AI-Powered Knowledge Base Assistant
Version	1.0
Author	Gangabathina Chanakya
Status	Draft
Date	July 2026
Revision History
Version	Date	Author	Description
1.0	July 2026	Gangabathina Chanakya	Initial HLD
Table of Contents
System Overview
Architecture Overview
Technology Stack
High-Level Components
System Workflow
Authentication Flow
Document Processing Flow
AI Question Answering Flow
Dashboard Flow
Database Overview
Security Considerations
Scalability Considerations
Deployment Architecture
1. System Overview

KnowledgeHub AI is a full-stack web application that enables authenticated users to upload documents and interact with them using Artificial Intelligence.

The system consists of:

React Frontend
Express Backend
MongoDB Database
Gemini AI API
JWT Authentication

The application follows a layered architecture that separates presentation, business logic, and data access to improve maintainability and scalability.

2. Architecture Overview
+-----------------------+
|      React Client     |
| (TypeScript + Tailwind)|
+-----------+-----------+
            |
         HTTPS (REST API)
            |
+-----------v-----------+
|      Express API      |
|-----------------------|
| Authentication        |
| Document Service      |
| AI Service            |
| Dashboard Service     |
| Search Service        |
+-----------+-----------+
            |
     +------+------+
     |             |
+----v----+   +----v----+
| MongoDB |   | Gemini  |
| Database|   | AI API  |
+---------+   +---------+
3. Technology Stack
Frontend
React
TypeScript
Tailwind CSS
React Router
Axios
React Hook Form
Backend
Node.js
Express.js
TypeScript
JWT
bcrypt
Multer
pdf-parse
Database
MongoDB
Mongoose ODM
AI
Google Gemini API
Development Tools
Git
GitHub
Postman
VS Code
npm
4. High-Level Components
Frontend

Responsible for:

Authentication UI
Dashboard
Document Upload
Chat Interface
Search
Conversation History
Backend API

Responsible for:

Request validation
Authentication
Business logic
AI integration
File processing
Database communication
Database

Stores:

Users
Documents
Conversations
AI Service

Responsible for:

Receiving document text
Processing user questions
Returning AI-generated answers
5. System Workflow
User Registration
User
   ↓
Frontend
   ↓
Backend
   ↓
Hash Password
   ↓
MongoDB
User Login
User
   ↓
Backend
   ↓
Validate Credentials
   ↓
Generate JWT
   ↓
Frontend
Upload Document
User
   ↓
Frontend
   ↓
Upload API
   ↓
File Validation
   ↓
Text Extraction
   ↓
MongoDB
Ask AI Question
User
   ↓
Frontend
   ↓
Backend
   ↓
Retrieve Document
   ↓
Gemini API
   ↓
Store Conversation
   ↓
Return Response
6. Authentication Flow
User submits login credentials.
Backend validates email and password.
Password is verified using bcrypt.
JWT token is generated.
Token is returned to the client.
Client stores the token securely.
Protected requests include the JWT in the Authorization header.
Middleware validates the token before processing requests.
7. Document Processing Flow
User uploads a supported file.
Backend validates file type.
Multer stores the uploaded file temporarily.
Text is extracted based on file format.
Metadata is generated.
Extracted content and metadata are stored in MongoDB.
Document becomes available for AI queries.
8. AI Question Answering Flow
User selects a document.
User enters a question.
Backend retrieves the document content.
A structured prompt is generated.
Prompt is sent to Gemini API.
AI generates an answer.
Response is stored in the Conversation collection.
Answer is returned to the user.
9. Dashboard Flow

Dashboard aggregates:

Total uploaded documents
Total questions asked
Recent uploads
Recent conversations

The backend computes these metrics from MongoDB and returns them through a dedicated dashboard API.

10. Database Overview

The application contains three primary collections.

Users

Stores:

User information
Authentication details
Documents

Stores:

File information
Metadata
Extracted document text
Owner information
Conversations

Stores:

User
Document
Question
AI Response
Timestamp
11. Security Considerations

The system implements multiple security measures.

JWT Authentication
Password hashing using bcrypt
Protected APIs
Input validation
File type validation
File size restrictions
Environment variables for secrets
Centralized error handling
CORS configuration
12. Scalability Considerations

The architecture is designed to support future enhancements.

Potential improvements include:

Cloud object storage (AWS S3)
Redis caching
Load balancing
Containerization with Docker
Kubernetes deployment
Vector databases for Retrieval-Augmented Generation (RAG)
Multiple AI providers
Microservices architecture
13. Deployment Architecture
                Internet
                    |
          +-------------------+
          |   React Frontend  |
          | (Vercel / Netlify)|
          +---------+---------+
                    |
                HTTPS
                    |
          +---------v---------+
          | Express Backend   |
          | (Render / Railway)|
          +---------+---------+
                    |
          +---------v---------+
          |     MongoDB       |
          |   MongoDB Atlas   |
          +-------------------+

                    |
          +---------v---------+
          |    Gemini API     |
          +-------------------+
Design Decisions
Decision	Rationale
React + TypeScript	Strong typing and maintainability
Express.js	Lightweight and widely adopted backend framework
MongoDB	Flexible schema for document and conversation data
JWT	Stateless authentication suitable for REST APIs
Gemini API	Easy integration and generous free tier
Layered Architecture	Separation of concerns and easier maintenance
Tailwind CSS	Rapid development and responsive UI
Conclusion

The proposed architecture provides a modular, secure, and scalable foundation for KnowledgeHub AI. By separating the frontend, backend, AI integration, and database into distinct layers, the application becomes easier to maintain, test, and extend while meeting all functional requirements of the technical assessment.
