import ConversationModel, { IConversation } from '../models/conversation.model.js';

class ConversationRepository {
  async save(data: Partial<IConversation>) {
    return ConversationModel.create(data);
  }

  async findByUser(
    userId: string,
    options?: { search?: string; documentId?: string }
  ) {
    const filter: Record<string, unknown> = { userId };

    if (options?.documentId) {
      filter.documentId = options.documentId;
    }

    if (options?.search?.trim()) {
      const search = options.search.trim();
      filter.$or = [
        { question: { $regex: search, $options: "i" } },
        { answer: { $regex: search, $options: "i" } },
      ];
    }

    return ConversationModel.find(filter)
      .populate("documentId", "title fileName")
      .sort({ createdAt: -1 });
  }

  async countByUser(userId: string) {
    return ConversationModel.countDocuments({ userId });
  }
}

export const conversationRepository = new ConversationRepository();
