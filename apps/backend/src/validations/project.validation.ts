import { z } from "zod";

export const getProjectByIdSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive(),
    }),
    query: z.object({}),
    body: z.object({}),
})

export const getMembersSchema = z.object({
    params: z.object({
        projectId: z.coerce.number().int().positive(),
    }),
    query: z.object({}),
    body: z.object({}),
})