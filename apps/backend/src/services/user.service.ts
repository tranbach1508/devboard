import * as userRepo from '../repositories/user.repository';

export const getAllUsers = async () => {
    const users = await userRepo.getAll();
    return users;
}