import { documentRepository } from '../repositories/document.repository.js';
import { conversationRepository } from '../repositories/conversation.repository.js';

class DashboardService {
  async getDashboard(userId: string) {
    const [totalDocuments, totalQuestions, recentUploads] = await Promise.all([
      documentRepository.countByUser(userId),
      conversationRepository.countByUser(userId),
      documentRepository.findRecentByUser(userId, 5),
    ]);

    return {
      totalDocuments,
      totalQuestions,
      recentUploads,
    };
  }
}

export const dashboardService = new DashboardService();
