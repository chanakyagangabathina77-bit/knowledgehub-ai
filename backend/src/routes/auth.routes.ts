import { Router } from "express";

import {
  login,
  profile,
  register,
} from "../controllers/auth.controller.js";

import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";

import { validateRequest } from "../middleware/validation.middleware.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  registerValidator,
  validateRequest,
  register
);

router.post(
  "/login",
  loginValidator,
  validateRequest,
  login
);

router.get(
  "/profile",
  authenticate,
  profile
);

export default router;