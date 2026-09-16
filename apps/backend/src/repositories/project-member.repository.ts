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
                },
            },
        },
    });
};

export const findProjectMember = async (
  projectId: number,
  userId: number
) => {
  return prisma.projectMember.findUnique({
    where: {
      projectId_userId: {
        projectId: projectId,
        userId: userId,
      }
    },
  });
};