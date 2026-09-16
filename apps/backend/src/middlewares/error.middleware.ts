import { Request, Response, NextFunction } from "express";
import { AppError } from '../utils/app-error';
import logger from "../config/logger";

export const errorMiddleware = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    if (err instanceof AppError) {
        logger.warn(err);
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }

    console.log(err)
    // logger.error(err);
    
    return res.status(500).json({
        status: "error",
        message: "Internal server error",
    })
}