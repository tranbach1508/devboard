import prisma from '../config/database';

export const findTeamById = async (id: number) => {
    return prisma.team.findUnique({
        where: {
            id: id
        }
    })
}

export const getTeams = async (page: number, perPage: number) => {
    return prisma.team.findMany({
        skip: (page - 1) * perPage,
        take: perPage,
        select: {
            id: true,
            name: true,
            description: true,
            users: {
                select: {
                    name: true
                }
            }
        },
    });
}
