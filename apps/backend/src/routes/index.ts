import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import teamRoutes from "./team.routes";
import projectRoutes from "./project.routes";
import taskRoutes from "./task.routes";
import commentRoutes from "./comment.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/teams", teamRoutes);
router.use("/projects", projectRoutes);
router.use("/projects/:projectId/tasks", taskRoutes);
router.use("/tasks/:taskId/comments", commentRoutes);

export default router;
