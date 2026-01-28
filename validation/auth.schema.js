import { z } from "zod";

export const signUpSchema = z.object({
    username: z.string().trim().min(2).max(100),
    email: z.string().toLowerCase().trim().pipe(z.email()),
    password: z.string().min(6),
});

export const signInSchema = z.object({
    identifiers: z.string().trim().min(1).max(100),
    password: z.string().min(6),
});

export const userSSchema = z.object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6),
});
