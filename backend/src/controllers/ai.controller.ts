import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { aiService } from '../services/ai.service.js';

export const askQuestion = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?.id as string;
  const { documentId, question } = req.body;

  const result = await aiService.askQuestion(userId, documentId, question);

  res.status(StatusCodes.OK).json(
    new ApiResponse(true, 'AI response generated successfully', result)
  );
});
