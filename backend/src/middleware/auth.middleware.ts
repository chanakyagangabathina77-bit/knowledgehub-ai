import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { verifyToken } from "../utils/jwt.js";
import { userRepository } from "../repositories/user.repository.js";
import { ApiError } from "../utils/ApiError.js";

export const authenticate = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return next(
      new ApiError(
        StatusCodes.UNAUTHORIZED,
        "Access token missing"
      )
    );
  }

  const token = authHeader.split(" ")[1];

  let payload;
  try {
    payload = verifyToken(token);
  } catch (error: any) {
    const message =
      error?.name === "TokenExpiredError"
        ? "Access token expired. Please log in again."
        : "Invalid access token";

    return next(new ApiError(StatusCodes.UNAUTHORIZED, message));
  }

  const user = await userRepository.findById(payload.userId);

  if (!user) {
    return next(
      new ApiError(
        StatusCodes.UNAUTHORIZED,
        "Unauthorized"
      )
    );
  }

  req.user = {
    id: user._id.toString(),
    email: user.email,
  };

  next();
};