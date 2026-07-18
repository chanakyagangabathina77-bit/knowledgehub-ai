import { Router } from 'express';
import { getHistory } from '../controllers/history.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', authenticate, getHistory);

export default router;
