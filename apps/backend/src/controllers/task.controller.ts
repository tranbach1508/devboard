import { Request, Response } from "express";
import * as taskSrv from "../services/task.service";
import { AppError } from '../utils/app-error';

export const createTask = async (req: Request,res: Response) => {
    const projectId = Number(req.params.projectId);
    const {assigneeId,title,description,priority,dueDate} = req.body;
    const createdBy = req.user.id;
    const result = await taskSrv.createTask(projectId,assigneeId,title,description,priority,dueDate,createdBy);
    res.status(201).json({
        sucess: true,
        data: result
    })
}

export const getTaskById = async (req: Request,res: Response) => {
    const projectId = Number(req.params.projectId);
    const id = Number(req.params.id);
    const result = await taskSrv.getTaskById(projectId,id);
    res.status(200).json({
        sucess: true,
        data: result
    })
}

export const getTasks = async (req: Request,res: Response) => {
    const projectId = Number(req.params.projectId);
    const result = await taskSrv.getTasksByProjectId(projectId);
    res.status(200).json({
        sucess: true,
        data: result
    })
}