import z from "zod";

export const purchaseCourseSchema = z.object({
    priceAtPurchase: z
        .number()
        .min(0, "Price cannot be negative")
        .max(1000000, "Price exceeds maximum limit"),
    status: z.enum(["pending", "completed", "cancelled"]).optional(),
});
