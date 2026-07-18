import { GoogleGenAI } from '@google/genai';
import { ApiError } from '../utils/ApiError.js';
import { documentRepository } from '../repositories/document.repository.js';
import { conversationRepository } from '../repositories/conversation.repository.js';
import { geminiConfig } from '../config/gemini.js';
import { env } from '../config/env.js';

const extractTerms = (text: string) =>
  (text.toLowerCase().match(/\b[\w']+\b/g) || [])
    .filter(Boolean)
    .map((word) => word.replace(/^'|'$/g, ''))
    .filter(Boolean);

const chunkDocument = (content: string) => {
  const paragraphs = content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const chunks: string[] = [];
  paragraphs.forEach((paragraph) => {
    if (paragraph.length <= 800) {
      chunks.push(paragraph);
      return;
    }

    const sentences = paragraph.split(/(?<=[.!?])\s+/).map((sentence) => sentence.trim()).filter(Boolean);
    let currentChunk = '';

    for (const sentence of sentences) {
      if (currentChunk.length + sentence.length + 1 <= 800) {
        currentChunk = currentChunk ? `${currentChunk} ${sentence}` : sentence;
      } else {
        if (currentChunk) chunks.push(currentChunk.trim());
        currentChunk = sentence;
      }
    }

    if (currentChunk) chunks.push(currentChunk.trim());
  });

  return chunks;
};

const summarizeAnswer = (content: string, question: string) => {
  const questionTerms = new Set(extractTerms(question));
  const chunks = chunkDocument(content);

  const scored = chunks
    .map((chunk) => {
      const words = extractTerms(chunk);
      const matches = words.filter((word) => questionTerms.has(word)).length;
      const density = matches / Math.max(words.length, 1);
      const score = matches * 3 + density;
      return {
        chunk,
        score,
        matches,
      };
    })
    .filter((item) => item.matches > 0)
    .sort((a, b) => b.score - a.score);

  const best = scored[0];
  if (!best) {
    return 'I couldn’t find an answer in the document. Please try a different question or choose another document.';
  }

  const snippet = best.chunk.length > 700 ? `${best.chunk.slice(0, 700).trim()}...` : best.chunk;
  return `Here is the most relevant answer from the document:

${snippet}`;
};

class AIService {
  private ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

  async askQuestion(userId: string, documentId: string, question: string) {
    const document = await documentRepository.findById(documentId);

    if (!document) {
      throw new ApiError(404, 'Document not found');
    }

    if (document.userId.toString() !== userId) {
      throw new ApiError(403, 'Forbidden');
    }

    let answer: string;

    if (!env.GEMINI_API_KEY || env.GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY') {
      answer = summarizeAnswer(document.content, question);
    } else {
      const prompt = `Use the following document content to answer the question. If the answer is not present, say you do not know.

Document title: ${document.title}
Document content:
${document.content}

Question: ${question}
Answer:`;

      try {
        const response = await this.ai.models.generateContent({
          model: geminiConfig.model,
          contents: prompt,
          config: {
            temperature: 0.3,
            maxOutputTokens: 500,
          },
        });

        answer = response.text ?? JSON.stringify(response);
      } catch (err: any) {
        console.error('GenAI error:', err?.message ?? err, err);

        const message = String(err?.message || err || 'Unknown error');
        const isQuotaError = [
          'RESOURCE_EXHAUSTED',
          'quota',
          'limit',
          '429',
          'Quota exceeded',
        ].some((term) => message.includes(term));

        if (
          message.includes('not found') ||
          message.includes('NOT_FOUND') ||
          message.includes('is not found') ||
          message.includes('not supported')
        ) {
          answer = summarizeAnswer(document.content, question);
        } else if (isQuotaError) {
          answer =
            'External AI is temporarily unavailable, showing document-based answer instead.\n\n' +
            summarizeAnswer(document.content, question);
        } else {
          answer = summarizeAnswer(document.content, question);
        }
      }
    }

    const conversation = await conversationRepository.save({
      userId,
      documentId,
      question,
      answer,
    });

    return {
      answer,
      conversation,
    };
  }
}

export const aiService = new AIService();
