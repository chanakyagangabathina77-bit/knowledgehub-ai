# API Specification

API Specification
KnowledgeHub AI – AI-Powered Knowledge Base Assistant
Field	Details
Document Type	API Specification
Project Name	KnowledgeHub AI – AI-Powered Knowledge Base Assistant
Version	1.0
Author	Gangabathina Chanakya
Status	Draft
Date	July 2026
Revision History
Version	Date	Author	Description
1.0	July 2026	Gangabathina Chanakya	Initial API Specification
Table of Contents
API Overview
Base URL
Authentication
Standard Response Format
Authentication APIs
Document APIs
AI APIs
Conversation APIs
Dashboard APIs
Error Codes
1. API Overview

The application exposes RESTful APIs over HTTPS.

All protected endpoints require a valid JWT access token.

Content-Type

application/json

Authentication Header

Authorization: Bearer <JWT_TOKEN>
2. Base URL
Local
http://localhost:5000/api
Production
https://your-domain.com/api
3. Authentication

All APIs except Register and Login require a valid JWT.

If the token is missing or invalid, the API returns:

401 Unauthorized
4. Standard Response Format
Success Response
{
  "success": true,
  "message": "Request successful",
  "data": {}
}
Error Response
{
  "success": false,
  "message": "Something went wrong"
}
5. Authentication APIs
Register User
Endpoint
POST /auth/register
Request
{
  "name": "Gangabathina Chanakya",
  "email": "chanakya@example.com",
  "password": "Password@123"
}
Success Response
201 Created
{
  "success": true,
  "message": "User registered successfully"
}
Login
Endpoint
POST /auth/login
Request
{
  "email": "chanakya@example.com",
  "password": "Password@123"
}
Success Response
200 OK
{
  "success": true,
  "token": "<JWT_TOKEN>"
}
Get Current User
Endpoint
GET /auth/profile

Authentication Required

Response
200 OK
{
  "success": true,
  "data": {
    "id": "...",
    "name": "Gangabathina Chanakya",
    "email": "chanakya@example.com"
  }
}
6. Document APIs
Upload Document
Endpoint
POST /documents

Authentication Required

Request
multipart/form-data
Field	Type
file	PDF / TXT / MD
Success Response
201 Created
{
  "success": true,
  "message": "Document uploaded successfully"
}
Get All Documents
Endpoint
GET /documents
Response
200 OK
{
  "success": true,
  "data": [
    {
      "id": "...",
      "title": "Employee Handbook",
      "fileType": "PDF",
      "uploadedAt": "2026-07-18"
    }
  ]
}
Get Document By ID
Endpoint
GET /documents/:id
Response
200 OK
{
  "success": true,
  "data": {
    "id": "...",
    "title": "Employee Handbook",
    "fileType": "PDF",
    "metadata": {}
  }
}
Delete Document (Optional)
Endpoint
DELETE /documents/:id
Response
200 OK
{
  "success": true,
  "message": "Document deleted successfully"
}
7. AI APIs
Ask Question
Endpoint
POST /ai/ask

Authentication Required

Request
{
  "documentId": "66abc123",
  "question": "What is the leave policy?"
}
Success Response
200 OK
{
  "success": true,
  "data": {
    "question": "What is the leave policy?",
    "answer": "Employees are entitled to 18 annual leave days."
  }
}
8. Conversation APIs
Get Conversation History
Endpoint
GET /history

Authentication Required

Response
200 OK
{
  "success": true,
  "data": [
    {
      "document": "Employee Handbook",
      "question": "What is the leave policy?",
      "answer": "Employees are entitled to 18 annual leave days.",
      "createdAt": "2026-07-18"
    }
  ]
}
Search Conversations
Endpoint
GET /history/search?q=leave

Authentication Required

Response
200 OK

Returns matching conversations.

9. Dashboard APIs
Get Dashboard Statistics
Endpoint
GET /dashboard

Authentication Required

Response
200 OK
{
  "success": true,
  "data": {
    "totalDocuments": 15,
    "totalQuestions": 62,
    "recentUploads": 5,
    "recentConversations": 10
  }
}
10. Error Codes
HTTP Status	Description
200	Request Successful
201	Resource Created
400	Bad Request
401	Unauthorized
403	Forbidden
404	Resource Not Found
409	Conflict (Duplicate Email)
413	Payload Too Large
415	Unsupported Media Type
422	Validation Failed
429	Too Many Requests (Future Enhancement)
500	Internal Server Error
503	AI Service Unavailable
API Security

The APIs implement the following security measures:

JWT-based authentication
Password hashing using bcrypt
Input validation
File type validation
File size restrictions
Authorization checks to ensure users can access only their own documents
Environment-based secret management
Future API Enhancements

Future versions may include:

API versioning (/api/v2)
Pagination support
Rate limiting
Bulk document upload
Streaming AI responses
WebSocket support
OpenAPI (Swagger) documentation
Conclusion

The API design follows RESTful principles with consistent request and response formats, secure authentication, meaningful HTTP status codes, and modular endpoints. The design supports maintainability, scalability, and future enhancements while satisfying all functional requirements of the project.