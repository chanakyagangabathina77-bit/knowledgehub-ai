import { Router } from 'express';
import { uploadDocument, listDocuments, getDocument, deleteDocument } from '../controllers/document.controller.js';
import { uploadMiddleware } from '../middleware/upload.middleware.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validateRequest } from '../middleware/validation.middleware.js';
import { uploadValidation } from '../validators/document.validator.js';

const router = Router();

router.post(
  '/',
  authenticate,
  uploadMiddleware.single('file'),
  uploadValidation,
  validateRequest,
  uploadDocument
);
router.get('/', authenticate, listDocuments);
router.get('/:id', authenticate, getDocument);
router.delete('/:id', authenticate, deleteDocument);

export default router;
