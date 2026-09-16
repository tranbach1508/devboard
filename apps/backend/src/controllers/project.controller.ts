import { Request, Response, NextFunction } from "express";
import * as projectSrv from "../services/project.service";

export const getProjectMembers = async (req: Request, res: Response) => {
    const projectId = Number(req.params.projectId);
    const members = await projectSrv.getProjectMembers(projectId);
    res.json({
        success: true,
        data: members,
    });
};
