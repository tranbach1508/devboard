import { z } from "zod";

export const getTeamByIdSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive(),
    }),
    query: z.object({}),
    body: z.object({}),
})

export const getTeamsSchema = z.object({
    params: z.object({}),
    query: z.object({
        page: z.coerce.number().int().positive(),
        per_page: z.coerce.number().int().positive(),
    }),
    body: z.object({}),
})