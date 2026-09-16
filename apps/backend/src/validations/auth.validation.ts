import { z } from "zod";

export const registerSchema = z.object({
    params: z.object({}),
    query: z.object({}),
    body: z.object({
        name: z.coerce.string(),
        email: z.coerce.string(),
        password: z.coerce.string(),
    }),
})

export const loginSchema = z.object({
    params: z.object({}),
    query: z.object({}),
    body: z.object({
        email: z.coerce.string(),
        password: z.coerce.string(),
    }),
})