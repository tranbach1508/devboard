import { Request, Response } from "express";
import * as authSrv from "../services/auth.service";

export const registerUser = async (req: Request,res: Response) => {
    const {name,email,password} = req.body;
    const result = await authSrv.registerUser(name,email,password);
    res.status(201).json({
        sucess: true,
        data: result
    })
}

export const loginUser = async (req: Request,res: Response) => {
    const {email,password} = req.body;
    const result = await authSrv.loginUser(email,password);
    res.status(201).json({
        sucess: true,
        data: result
    })
}

export const getProfile = async (req: Request, res: Response) => {
    const user = req.user;
    res.status(201).json({
        sucess: true,
        data: {
            user
        }
    })
}