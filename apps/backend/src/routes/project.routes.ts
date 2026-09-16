import { Router } from "express";
import * as projectCtrl from "../controllers/project.controller";
import { asyncHandler } from "../utils/async-handler";
import { validate } from "../middlewares/validate.middleware";
import { getProjectByIdSchema, getMembersSchema } from "../validations/project.validation.ts";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ message: "Get all projects - TODO" });
});

router.get("/:id", (_req, res) => {
  res.json({ message: "Get project by id - TODO" });
});

router.post("/", (_req, res) => {
  res.json({ message: "Create project - TODO" });
});

router.put("/:id", (_req, res) => {
  res.json({ message: "Update project - TODO" });
});

router.delete("/:id", (_req, res) => {
  res.json({ message: "Delete project - TODO" });
});

// Project Members
router.get("/:projectId/members", validate(getMembersSchema), asyncHandler(projectCtrl.getProjectMembers));

router.post("/:projectId/members", (_req, res) => {
  res.json({ message: "Add project member - TODO" });
});

router.delete("/:projectId/members/:userId", (_req, res) => {
  res.json({ message: "Remove project member - TODO" });
});

export default router;
