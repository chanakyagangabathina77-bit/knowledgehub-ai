import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { documentService } from '../services/document.service.js';

export const uploadDocument = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?.id as string;
  const file = (req as any).file as Express.Multer.File | undefined;
  const title = req.body.title as string | undefined;

  const document = await documentService.uploadDocument(userId, file, title);

  res.status(StatusCodes.CREATED).json(
    new ApiResponse(true, 'Document uploaded successfully', document)
  );
});

export const listDocuments = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?.id as string;
  const search = typeof req.query.search === 'string' ? req.query.search : undefined;
  const fileType = typeof req.query.fileType === 'string' ? req.query.fileType : undefined;
  const documents = await documentService.listDocuments(userId, { search, fileType });

  res.status(StatusCodes.OK).json(
    new ApiResponse(true, 'Documents retrieved successfully', documents)
  );
});

export const getDocument = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?.id as string;
  const documentId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const document = await documentService.getDocument(userId, documentId);

  res.status(StatusCodes.OK).json(
    new ApiResponse(true, 'Document retrieved successfully', document)
  );
});

export const deleteDocument = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?.id as string;
  const documentId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

  await documentService.deleteDocument(userId, documentId);

  res.status(StatusCodes.OK).json(
    new ApiResponse(true, 'Document deleted successfully')
  );
});
