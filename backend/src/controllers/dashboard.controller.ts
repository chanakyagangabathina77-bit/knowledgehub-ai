import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { dashboardService } from '../services/dashboard.service.js';

export const getDashboard = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?.id as string;
  const dashboard = await dashboardService.getDashboard(userId);

  res.status(StatusCodes.OK).json(
    new ApiResponse(true, 'Dashboard statistics retrieved successfully', dashboard)
  );
});
