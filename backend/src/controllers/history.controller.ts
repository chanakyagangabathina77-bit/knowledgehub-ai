import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { historyService } from '../services/history.service.js';

export const getHistory = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?.id as string;
  const search = typeof req.query.search === 'string' ? req.query.search : undefined;
  const documentId = typeof req.query.documentId === 'string' ? req.query.documentId : undefined;
  const history = await historyService.getHistory(userId, { search, documentId });

  res.status(StatusCodes.OK).json(
    new ApiResponse(true, 'History retrieved successfully', history)
  );
});
