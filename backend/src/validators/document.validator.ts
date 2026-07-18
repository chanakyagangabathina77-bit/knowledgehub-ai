import { body } from 'express-validator';

export const uploadValidation = [
  body('title').optional().trim(),
];
