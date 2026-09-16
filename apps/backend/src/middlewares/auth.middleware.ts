import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/app-error";
import { verifyAccessToken } from "../utils/jwt";
import * as authRepo from "../repositories/auth.repository";

export const authenticate = async (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new AppError("Authentication required", 401 );
        }
        const [scheme, token] = authHeader.split(" ");
        if (scheme !== "Bearer" || !token) {
            throw new AppError("Invalid authorization header", 401 );
        }
        const decoded = verifyAccessToken(token);
        if ( typeof decoded !== "object" || !decoded.sub ) {
            throw new AppError(
                "Invalid access token",
                401
            );
        }
        const userId = Number(decoded.sub);
        const user = await authRepo.findUserById(userId);
        if (!user) {
            throw new AppError(
                "User not found",
                401
            );
        }
        const { passwordHash: _, ...safeUser } = user;
        req.user = safeUser;
        next();
    }catch(error){
        if (error instanceof jwt.JsonWebTokenError) {
            next(
                new AppError(
                "Invalid or expired access token",
                401
                )
            );

            return;
        }
        next(error);
    }
}