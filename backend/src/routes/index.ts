import { Router } from "express";

import authRoutes from "./auth.routes.js";
import documentRoutes from "./document.routes.js";
import aiRoutes from "./ai.routes.js";
import historyRoutes from "./history.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import { register, login } from "../controllers/auth.controller.js";
import { registerValidator, loginValidator } from "../validators/auth.validator.js";
import { validateRequest } from "../middleware/validation.middleware.js";
import { askQuestion } from "../controllers/ai.controller.js";
import { askQuestionValidation } from "../validators/ai.validator.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/signup", registerValidator, validateRequest, register);
router.post("/login", loginValidator, validateRequest, login);
router.post("/ask", authenticate, askQuestionValidation, validateRequest, askQuestion);

router.use("/auth", authRoutes);

router.use("/documents", documentRoutes);

router.use("/ai", aiRoutes);

router.use("/history", historyRoutes);

router.use("/dashboard", dashboardRoutes);

export default router;