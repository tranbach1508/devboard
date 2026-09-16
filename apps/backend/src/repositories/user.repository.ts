import prisma from '../config/database';

export const getAll = async () => {
    return prisma.user.findMany();
}