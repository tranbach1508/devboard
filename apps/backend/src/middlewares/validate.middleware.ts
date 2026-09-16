import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { AppError } from "../utils/app-error";

export const validate = (schema: ZodType) => {
    return (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        const result = schema.safeParse({
            params: req.params,
            query: req.query,
            body: req.body,
        })
        if(!result.success){
            return next(new AppError("Invalid request data",400));
        }
        next();
    }
}