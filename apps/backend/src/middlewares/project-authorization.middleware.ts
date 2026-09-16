import {
  Request,
  Response,
  NextFunction,
} from "express";

import { AppError } from "../utils/app-error";
import * as authorizationService
  from "../services/authorization.service";

export const requireProjectRole =
  (...roles: string[]) =>
  async (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) {
        throw new AppError(
          "Authentication required",
          401
        );
      }

      const projectId = Number(
        req.params.projectId
      );

      if (!Number.isInteger(projectId)) {
        throw new AppError(
          "Invalid project ID",
          400
        );
      }

      await authorizationService.requireProjectRole(
        req.user.id,
        projectId,
        roles
      );

      next();
    } catch (error) {
      next(error);
    }
  };