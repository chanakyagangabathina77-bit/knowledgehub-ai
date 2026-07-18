import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { authService } from "../services/auth.service.js";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const data = await authService.register(req.body);

  res.status(StatusCodes.CREATED).json(
    new ApiResponse(true, "User registered successfully", data)
  );
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const data = await authService.login(req.body);

  res.status(StatusCodes.OK).json(
    new ApiResponse(true, "Login successful", data)
  );
});

export const profile = asyncHandler(async (req: any, res: Response) => {
  const user = await authService.getProfile(req.user.id);

  res.status(StatusCodes.OK).json(
    new ApiResponse(true, "Profile fetched successfully", user)
  );
});