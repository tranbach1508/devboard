import { Router } from "express";
import { registerUser, loginUser, getProfile } from "../controllers/auth.controller";
import { asyncHandler } from "../utils/async-handler";
import { validate } from "../middlewares/validate.middleware";
import { registerSchema, loginSchema } from "../validations/auth.validation";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", validate(registerSchema), asyncHandler(registerUser));

router.post("/login", validate(loginSchema), asyncHandler(loginUser));

router.post("/logout", (_req, res) => {
  res.json({ message: "Logout - TODO" });
});

router.get("/me", authenticate, asyncHandler(getProfile));

export default router;
