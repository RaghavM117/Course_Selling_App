import { z } from "zod";

export const postCourseSchema = z.object({
    title: z.string().trim().min(2).max(100),
    description: z.string().trim().min(10).max(1000),
    category: z.string().trim().min(2).max(100),
    level: z.enum(["beginner", "intermediate", "advanced"]),
    language: z.string().trim().min(2).max(50),
    duration: z.string().trim().min(1).max(50),
    image: z.string().z.url(),
    price: z.number().min(0).max(1_000_000),
});

export const updateCourseSchema = postCourseSchema.partial();

const courseIdParamSchema = z.object({
    courseId: z.string().regex(/^[a-f\d]{24}$/i, "Invalid Mongo ID"),
});
