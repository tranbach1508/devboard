import prisma from '../config/database';

export const getMembersByProjectId = async (projectId: number) => {
    return prisma.projectMember.findMany({
        where: { projectId },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                },
            },
        },
    });
};
export const getById = async (id: number) => {
    return prisma.project.findUnique({
        where: { id },
        include: { projectMembers: true },
    });
};
