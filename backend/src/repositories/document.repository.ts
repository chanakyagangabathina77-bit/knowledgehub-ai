import DocumentModel, { IDocument } from '../models/document.model.js';

class DocumentRepository {
  async create(data: Partial<IDocument>) {
    return DocumentModel.create(data);
  }

  async findByUser(
    userId: string,
    options?: { search?: string; fileType?: string }
  ) {
    const filter: Record<string, unknown> = { userId };

    if (options?.fileType) {
      filter.fileType = options.fileType;
    }

    if (options?.search?.trim()) {
      const search = options.search.trim();
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { fileName: { $regex: search, $options: "i" } },
      ];
    }

    return DocumentModel.find(filter).sort({ createdAt: -1 });
  }

  async findById(id: string) {
    return DocumentModel.findById(id);
  }

  async deleteById(id: string) {
    return DocumentModel.findByIdAndDelete(id);
  }

  async countByUser(userId: string) {
    return DocumentModel.countDocuments({ userId });
  }

  async findRecentByUser(userId: string, limit = 5) {
    return DocumentModel.find({ userId }).sort({ createdAt: -1 }).limit(limit);
  }
}

export const documentRepository = new DocumentRepository();
