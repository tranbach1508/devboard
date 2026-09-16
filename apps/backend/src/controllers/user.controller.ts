import { Request, Response } from "express";
import * as userSrv from "../services/user.service";

export const getAllUsers = async (req: Request, res: Response) => {
    const result = await userSrv.getAllUsers();
    res.status(201).json({
        sucess: true,
        data: result
    })
}