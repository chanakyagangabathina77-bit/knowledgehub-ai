import { connectDatabase } from '../config/database.js';
import { userRepository } from '../repositories/user.repository.js';
import { documentRepository } from '../repositories/document.repository.js';
import { aiService } from '../services/ai.service.js';

(async () => {
  try {
    await connectDatabase();

    const user = await userRepository.create({
      name: 'Quota Test User',
      email: `quota-test-${Date.now()}@example.com`,
      password: 'password123',
    });

    const document = await documentRepository.create({
      title: 'Quota Test Document',
      content: 'This document describes a knowledge hub AI application with frontend React, backend Node, and AI-powered question answering.',
      userId: user._id,
      fileName: 'quota.txt',
      fileType: 'text',
      mimeType: 'text/plain',
      size: 123,
      metadata: {},
    });

    const anyService: any = aiService;
    if (anyService.ai && anyService.ai.models) {
      anyService.ai.models.generateContent = async () => {
        const err: any = new Error('Quota exceeded for model');
        err.message = 'Quota exceeded for model';
        throw err;
      };
    }

    const result = await aiService.askQuestion(
      user._id.toString(),
      document._id.toString(),
      'What is this app about?'
    );

    console.log('Result answer:', result.answer);
  } catch (err) {
    console.error('Test failed', err);
    process.exit(1);
  }
})();
