import { Priority } from "../generated/prisma/enums";
import prisma from '../config/database';

export const add = async (projectId: number,assigneeId: number,title: string,description: string,priority: Priority,dueDate: Date,createdBy: number) => {
    return prisma.task.create({
        data: {
            projectId,
            assigneeId,
            title,
            description,
            priority,
            dueDate,
            createdBy,
        }
    })
}

export const getById = async (id: number) => {
    return prisma.task.findUnique({
        where: { id },
        include: {
            assignee: {
                select: { id: true, name: true, email: true },
            },
            memberCreated: {
                select: { id: true, name: true, email: true },
            },
            comments: {
                include: {
                    user: {
                        select: { id: true, name: true, email: true },
                    },
                },
                orderBy: { createdAt: "desc" },
            },
        },
    })
}

export const getByProjectId = async (projectId: number) => {
    return prisma.task.findMany({
        where: { projectId },
        include: {
            assignee: {
                select: { id: true, name: true, email: true },
            },
        },
        orderBy: { createdAt: "desc" },
    });
}