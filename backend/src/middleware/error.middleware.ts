import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack || err);

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });

    return;
  }

  const anyError = err as any;
  if (anyError.name === "MongoServerError" && anyError.code === 11000) {
    const duplicatedField = Object.keys(anyError.keyValue || {}).join(", ");
    res.status(409).json({
      success: false,
      message: duplicatedField
        ? `Duplicate value for field(s): ${duplicatedField}`
        : "Duplicate value error",
      errors: [anyError.keyValue],
    });
    return;
  }

  if (anyError.name === "ValidationError") {
    res.status(400).json({
      success: false,
      message: anyError.message || "Validation error",
      errors: anyError.errors,
    });
    return;
  }

  res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,
  });
};