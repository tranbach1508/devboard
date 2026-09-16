import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { requireProjectRole } from "../middlewares/project-authorization.middleware";
import { validate } from "../middlewares/validate.middleware";
import { asyncHandler } from "../utils/async-handler";
import { createTaskSchema,getTaskSchema } from "../validations/task.validation";
import {createTask,getTaskById,getTasks} from "../controllers/task.controller";

const router = Router({ mergeParams: true }); 

router.get("/", authenticate,requireProjectRole("ADMIN", "MANAGER","MEMBER"),asyncHandler(getTasks));

router.get("/:id", authenticate,requireProjectRole("ADMIN", "MANAGER","MEMBER"),validate(getTaskSchema),asyncHandler(getTaskById));

router.post("/", authenticate,requireProjectRole("ADMIN", "MANAGER"),validate(createTaskSchema),asyncHandler(createTask));

router.put("/:id", (_req, res) => {
  res.json({ message: "Update task - TODO" });
});

router.delete("/:id", (_req, res) => {
  res.json({ message: "Delete task - TODO" });
});

export default router;
