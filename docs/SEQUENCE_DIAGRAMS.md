# Sequence Diagrams

Sequence Diagrams
KnowledgeHub AI – AI-Powered Knowledge Base Assistant
Field	Details
Document Type	Sequence Diagrams
Project Name	KnowledgeHub AI – AI-Powered Knowledge Base Assistant
Version	1.0
Author	Gangabathina Chanakya
Status	Draft
Date	July 2026
Revision History
Version	Date	Author	Description
1.0	July 2026	Gangabathina Chanakya	Initial Sequence Diagrams
Table of Contents
User Registration
User Login
Document Upload
AI Question Answering
Conversation History
Dashboard Loading
1. User Registration
+--------+      +-----------+      +-----------+      +----------+
|  User  |      | Frontend  |      | Backend   |      | MongoDB  |
+--------+      +-----------+      +-----------+      +----------+
     |                 |                  |                 |
     | Register         |                  |                 |
     |----------------->|                  |                 |
     |                  | POST /register   |                 |
     |                  |----------------->|                 |
     |                  |                  | Validate Input  |
     |                  |                  | Hash Password   |
     |                  |                  | Save User       |
     |                  |                  |---------------> |
     |                  |                  | Success         |
     |                  |<-----------------|                 |
     | Success Message  |                  |                 |
     |<-----------------|                  |                 |
2. User Login
+--------+      +-----------+      +-----------+      +----------+
|  User  |      | Frontend  |      | Backend   |      | MongoDB  |
+--------+      +-----------+      +-----------+      +----------+
     | Login           |                  |                 |
     |---------------->|                  |                 |
     |                 | POST /login      |                 |
     |                 |----------------->|                 |
     |                 |                  | Verify User     |
     |                 |                  | Verify Password |
     |                 |                  | Generate JWT    |
     |                 |<-----------------|                 |
     | Receive Token   |                  |                 |
     |<----------------|                  |                 |
3. Document Upload
+--------+     +-----------+     +-----------+     +-----------+     +----------+
| User   |     | Frontend  |     | Backend   |     | Parser    |     | MongoDB  |
+--------+     +-----------+     +-----------+     +-----------+     +----------+
     | Upload File      |               |                 |               |
     |----------------->|               |                 |               |
     |                  | POST /documents               |               |
     |                  |-------------->|                 |               |
     |                  |               | Validate File   |               |
     |                  |               |---------------> |               |
     |                  |               | Extract Text    |               |
     |                  |               |<--------------- |               |
     |                  |               | Save Metadata   |-------------> |
     |                  |<--------------|                 |               |
     | Upload Success   |               |                 |               |
     |<-----------------|               |                 |               |
4. AI Question Answering
+--------+    +-----------+    +-----------+    +----------+    +-----------+
| User   |    | Frontend  |    | Backend   |    | Gemini   |    | MongoDB   |
+--------+    +-----------+    +-----------+    +----------+    +-----------+
     | Ask Question    |               |               |              |
     |---------------->|               |               |              |
     |                 | POST /ai/ask  |               |              |
     |                 |-------------->|               |              |
     |                 |               | Load Document |------------> |
     |                 |               | Build Prompt  |              |
     |                 |               |-------------->|              |
     |                 |               | AI Response   |<-------------|
     |                 |               | Save History  |------------> |
     |                 |<--------------|               |              |
     | Display Answer  |               |              |
     |<----------------|               |              |
5. Conversation History
+--------+      +-----------+      +-----------+      +----------+
| User   |      | Frontend  |      | Backend   |      | MongoDB  |
+--------+      +-----------+      +-----------+      +----------+
     | View History    |                  |                 |
     |---------------->|                  |                 |
     |                 | GET /history     |                 |
     |                 |----------------->|                 |
     |                 |                  | Fetch Records   |
     |                 |                  |---------------> |
     |                 |                  | Return History  |
     |                 |<-----------------|                 |
     | Display Chats   |                  |                 |
     |<----------------|                  |                 |
6. Dashboard Loading
+--------+      +-----------+      +-----------+      +----------+
| User   |      | Frontend  |      | Backend   |      | MongoDB  |
+--------+      +-----------+      +-----------+      +----------+
     | Open Dashboard |                  |                 |
     |--------------->|                  |                 |
     |                | GET /dashboard   |                 |
     |                |----------------->|                 |
     |                |                  | Aggregate Data  |
     |                |                  |---------------> |
     |                |                  | Metrics         |
     |                |<-----------------|                 |
     | Dashboard View |                  |                 |
     |<---------------|                  |                 |
Design Notes
All protected endpoints require a valid JWT.
The frontend communicates only with the backend.
The backend is responsible for validation, authorization, business logic, and database access.
The AI provider is accessed only through the backend, ensuring API keys remain secure.
Conversation history is persisted after each successful AI response.
Summary

These sequence diagrams describe the runtime interaction between the user interface, backend services, database, and AI provider. They serve as a blueprint for implementation and help ensure that each feature follows a consistent request-processing workflow.

The diagrams also make it easier to troubleshoot issues, onboard future developers, and explain the application's behavior during technical interviews.