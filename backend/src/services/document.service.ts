import { ApiError } from '../utils/ApiError.js';
import { documentRepository } from '../repositories/document.repository.js';
import { parsePdf } from '../processors/pdf.processor.js';
import { parseMarkdown } from '../processors/markdown.processor.js';

const getDocumentType = (fileName: string, mimeType: string) => {
  const name = fileName.toLowerCase();

  if (mimeType === 'application/pdf' || name.endsWith('.pdf')) {
    return 'pdf';
  }

  if (name.endsWith('.md') || name.endsWith('.markdown')) {
    return 'markdown';
  }

  if (mimeType === 'text/plain' || name.endsWith('.txt')) {
    return 'text';
  }

  return 'unknown';
};

class DocumentService {
  async uploadDocument(userId: string, file: Express.Multer.File | undefined, title?: string) {
    if (!file) {
      throw new ApiError(400, 'Document file is required');
    }

    const fileType = getDocumentType(file.originalname, file.mimetype);
    if (fileType === 'unknown') {
      throw new ApiError(400, 'Unsupported document format');
    }

    let content = '';

    if (fileType === 'pdf') {
      content = await parsePdf(file.buffer);
    } else if (fileType === 'markdown') {
      content = await parseMarkdown(file.buffer.toString('utf-8'));
    } else {
      content = file.buffer.toString('utf-8');
    }

    const document = await documentRepository.create({
      title: title?.trim() || file.originalname,
      content,
      userId,
      fileName: file.originalname,
      fileType,
      mimeType: file.mimetype,
      size: file.size,
      metadata: {
        encoding: file.encoding,
      },
    });

    return document;
  }

  async listDocuments(
    userId: string,
    options?: { search?: string; fileType?: string }
  ) {
    return documentRepository.findByUser(userId, options);
  }

  async getDocument(userId: string, documentId: string) {
    const document = await documentRepository.findById(documentId);

    if (!document) {
      throw new ApiError(404, "Document not found");
    }

    if (document.userId.toString() !== userId) {
      throw new ApiError(403, "Forbidden");
    }

    return {
      _id: document._id,
      title: document.title,
      fileName: document.fileName,
      fileType: document.fileType,
      mimeType: document.mimeType,
      size: document.size,
      metadata: document.metadata,
      createdAt: document.createdAt,
      content: document.content,
      contentLength: document.content.length,
    };
  }

  async deleteDocument(userId: string, documentId: string) {
    const document = await documentRepository.findById(documentId);

    if (!document) {
      throw new ApiError(404, 'Document not found');
    }

    if (document.userId.toString() !== userId) {
      throw new ApiError(403, 'Forbidden');
    }

    await documentRepository.deleteById(documentId);

    return document;
  }
}

export const documentService = new DocumentService();
