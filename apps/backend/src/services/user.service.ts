import * as userRepo from '../repositories/user.repository';
import { AppError } from '../utils/app-error';

export const getAllUsers = async () => {
    const users = await userRepo.getAll();
    return users;
}