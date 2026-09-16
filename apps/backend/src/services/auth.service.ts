import * as authRepo from '../repositories/auth.repository';
import { AppError } from '../utils/app-error';
import {generateAccessToken} from "../utils/jwt";
import {hashPassword,comparePassword} from "../utils/password";
import bcrypt from 'bcrypt';

export const registerUser = async (name: string, email: string, password: string) => {
    const existingUser = await authRepo.findUserByEmail(email);

    if (existingUser) {
        throw new AppError("Email already exists", 409);
    }
    const passwordHash = await hashPassword(password);
    const user = await authRepo.add(name,email,passwordHash);
    const { passwordHash: _, ...safeUser } = user;
    const accessToken = await generateAccessToken(user.id);
    return {
        user: safeUser,
        accessToken
    }
}

export const loginUser = async (email: string, password: string) => {
    const user = await authRepo.findUserByEmail(email);
    if(!user){
        throw new AppError("Invalid email or password", 401);
    }
    const isPasswordValid = await comparePassword(
      password,
      user.passwordHash
    );
    if (!isPasswordValid) {
        throw new AppError("Invalid email or password", 401 );
    }
    const accessToken = await generateAccessToken(user.id);
    const { passwordHash: _, ...safeUser } = user;
    return {
        user: safeUser,
        accessToken
    }
}

export const getProfile = async (id: number) => {
    const user = await authRepo.findUserById(id);
    if(!user){
        throw new AppError("User be not found", 409);
    }
}