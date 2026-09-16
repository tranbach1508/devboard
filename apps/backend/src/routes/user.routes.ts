import { Router } from "express";
import { getAllUsers } from "../controllers/user.controller";
import { asyncHandler } from "../utils/async-handler";

const router = Router();

router.get("/", asyncHandler(getAllUsers));

router.get("/:id", (_req, res) => {
  res.json({ message: "Get user by id - TODO" });
});

router.put("/:id", (_req, res) => {
  res.json({ message: "Update user - TODO" });
});

router.delete("/:id", (_req, res) => {
  res.json({ message: "Delete user - TODO" });
});

export default router;
