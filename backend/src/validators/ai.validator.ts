import { body } from 'express-validator';

export const askQuestionValidation = [
  body('question').notEmpty().withMessage('Question is required'),
  body('documentId').notEmpty().withMessage('Document ID is required'),
];
