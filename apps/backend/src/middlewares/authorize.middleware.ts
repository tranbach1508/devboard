import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";

export const authorize = (..._roles: string[]) => {
  return (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      next(
        new AppError(
          "Authentication required",
          401
        )
      );

      return;
    }

    // Tạm thời chưa kiểm tra role ở đây.
    // Role thuộc ProjectMember, không thuộc User.

    next();
  };
};