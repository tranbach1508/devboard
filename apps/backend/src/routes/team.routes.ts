import { Router } from "express";
import {getTeamById,getTeams} from "../controllers/team.controller";
import { asyncHandler } from "../utils/async-handler";
import { validate } from "../middlewares/validate.middleware";
import { getTeamByIdSchema, getTeamsSchema } from "../validations/team.validation";

const router = Router();

router.get("/", validate(getTeamsSchema), asyncHandler(getTeams));

router.get("/:id", validate(getTeamByIdSchema),asyncHandler(getTeamById));

router.post("/", validate(getTeamByIdSchema),asyncHandler(getTeamById));

router.put("/:id", validate(getTeamByIdSchema),asyncHandler(getTeamById));

router.delete("/:id", validate(getTeamByIdSchema),asyncHandler(getTeamById));

export default router;
