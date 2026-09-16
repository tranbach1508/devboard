import { z } from "zod";

export const createTaskSchema = z.object({
    params: z.object({
        projectId: z.coerce.number().int().positive()
    }),
    query: z.object({}),
    body: z.object({
        assigneeId: z.coerce.number().int().positive(),
        title: z.coerce.string(),
        description: z.coerce.string(),
        priority: z.coerce.string(),
        dueDate: z.coerce.date(),
    }),
})

export const getTaskSchema = z.object({
    params: z.object({
        projectId: z.coerce.number().int().positive(),
        id: z.coerce.number().int().positive(),
    }),
    query: z.object({}),
    body: z.object({}),
})