import { Router } from 'express';
import { askQuestion } from '../controllers/ai.controller.js';
import { askQuestionValidation } from '../validators/ai.validator.js';
import { validateRequest } from '../middleware/validation.middleware.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/ask', authenticate, askQuestionValidation, validateRequest, askQuestion);

export default router;
