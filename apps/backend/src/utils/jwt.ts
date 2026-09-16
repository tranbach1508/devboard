import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const generateAccessToken = (userId: number) => {
    return jwt.sign(
        {
            sub: userId
        },
        env.jwtSecret,
        {
            expiresIn: env.jwtExpiresIn
        }
    )
}

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, env.jwtSecret);
};