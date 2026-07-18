import { conversationRepository } from '../repositories/conversation.repository.js';

class HistoryService {
  async getHistory(
    userId: string,
    options?: { search?: string; documentId?: string }
  ) {
    return conversationRepository.findByUser(userId, options);
  }
}

export const historyService = new HistoryService();
