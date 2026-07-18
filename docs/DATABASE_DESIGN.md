# Database Design

Database Design
KnowledgeHub AI – AI-Powered Knowledge Base Assistant
Field	Details
Document Type	Database Design
Project Name	KnowledgeHub AI – AI-Powered Knowledge Base Assistant
Version	1.0
Author	Gangabathina Chanakya
Status	Draft
Date	July 2026
Revision History
Version	Date	Author	Description
1.0	July 2026	Gangabathina Chanakya	Initial Database Design
Table of Contents
Overview
Database Selection
Collections
Entity Relationship Diagram
Collection Schemas
Relationships
Indexing Strategy
Data Validation
Sample Documents
Future Enhancements
1. Overview

KnowledgeHub AI uses MongoDB as its primary database to store user information, uploaded documents, and AI conversation history.

The database is designed to support:

Secure user management
Efficient document storage
Fast AI conversation retrieval
Dashboard analytics
Search functionality
Future scalability
2. Database Selection
Why MongoDB?

MongoDB was selected because it provides:

Flexible schema design
High scalability
Excellent support for JSON-like documents
Easy integration with Node.js using Mongoose
Fast development for evolving application requirements
3. Collections

The application contains three primary collections:

Users

Stores authentication and profile information.

Documents

Stores uploaded document details, extracted content, and metadata.

Conversations

Stores AI question-answer interactions.

4. Entity Relationship Diagram
+------------------+
|      Users       |
+------------------+
| _id              |
| name             |
| email            |
| password         |
| createdAt        |
+---------+--------+
          |
          | 1
          |
          | N
+---------v--------+
|    Documents     |
+------------------+
| _id              |
| title            |
| fileName         |
| fileType         |
| content          |
| metadata         |
| userId           |
| createdAt        |
+---------+--------+
          |
          | 1
          |
          | N
+---------v--------+
|  Conversations   |
+------------------+
| _id              |
| userId           |
| documentId       |
| question         |
| answer           |
| createdAt        |
+------------------+
5. Collection Schemas
5.1 Users Collection
Purpose

Stores user account information.

Fields
Field	Type	Required	Description
_id	ObjectId	Yes	Primary key
name	String	Yes	User's full name
email	String	Yes	Unique email address
password	String	Yes	Hashed password
createdAt	Date	Yes	Account creation timestamp
updatedAt	Date	Yes	Last update timestamp
5.2 Documents Collection
Purpose

Stores uploaded documents and extracted text.

Fields
Field	Type	Required	Description
_id	ObjectId	Yes	Primary key
title	String	Yes	Display title
fileName	String	Yes	Original filename
fileType	String	Yes	PDF, TXT, Markdown
content	String	Yes	Parsed document text
metadata	Object	Yes	File metadata
userId	ObjectId	Yes	User reference
createdAt	Date	Yes	Upload timestamp
updatedAt	Date	Yes	Last update timestamp
5.3 Conversations Collection
Purpose

Stores AI conversations.

Fields
Field	Type	Required	Description
_id	ObjectId	Yes	Primary key
userId	ObjectId	Yes	User reference
documentId	ObjectId	Yes	Document reference
question	String	Yes	User question
answer	String	Yes	AI response
createdAt	Date	Yes	Conversation timestamp
6. Relationships
User → Documents

Relationship:

One-to-Many

A user can upload multiple documents.

Each document belongs to exactly one user.

User → Conversations

Relationship:

One-to-Many

Each user can have multiple AI conversations.

Document → Conversations

Relationship:

One-to-Many

Each document can have multiple conversations associated with it.

7. Indexing Strategy

To improve query performance, the following indexes are recommended.

Users
Field	Type
email	Unique Index
Documents
Field	Type
ownerId	Index
createdAt	Index
title	Text Index
Conversations
Field	Type
userId	Index
documentId	Index
createdAt	Index
question	Text Index
8. Data Validation Rules
Users
Email must be unique.
Password must be securely hashed.
Name is required.
Documents
Supported file types:
PDF
TXT
Markdown
Maximum upload size will be configurable.
Empty documents are rejected.
Conversations
Question cannot be empty.
AI response cannot be empty.
Document must exist.
User must be authenticated.
9. Sample Documents
Users
{
  "_id": "66abc123",
  "name": "Gangabathina Chanakya",
  "email": "chanakya@example.com",
  "password": "$2b$10$hashedPassword",
  "createdAt": "2026-07-18T10:00:00Z"
}
Documents
{
  "_id": "77def456",
  "title": "Employee Handbook",
  "fileName": "employee-handbook.pdf",
  "fileType": "PDF",
  "userId": "66abc123",
  "metadata": {
    "size": "2.1 MB",
    "pages": 24
  },
  "content": "Employees are entitled to 18 annual leave days...",
  "createdAt": "2026-07-18T10:15:00Z"
}
Conversations
{
  "_id": "88ghi789",
  "userId": "66abc123",
  "documentId": "77def456",
  "question": "What is the leave policy?",
  "answer": "Employees are entitled to 18 annual leave days.",
  "createdAt": "2026-07-18T10:30:00Z"
}
10. Future Enhancements

The database can be extended with additional collections such as:

Roles
Permissions
Notifications
AI Prompt Logs
Audit Logs
Document Versions
Shared Documents
User Preferences

Future performance improvements may include:

Redis caching
MongoDB Atlas Search
Vector database integration for Retrieval-Augmented Generation (RAG)
Sharding for horizontal scalability
Design Summary
Collection	Purpose
Users	User authentication and profile management
Documents	Uploaded files, metadata, and extracted content
Conversations	AI question and response history
Conclusion

The database design provides a normalized, scalable, and maintainable structure for KnowledgeHub AI. By modeling users, documents, and conversations with clear relationships and indexing strategies, the application supports efficient authentication, document management, AI-powered querying, and dashboard analytics while remaining flexible for future enhancements.
