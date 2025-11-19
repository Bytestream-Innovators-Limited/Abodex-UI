import { z } from "zod"

export const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    howYouFoundUs: z.enum(
        [
            "search_engine",
            "social_media",
            "friend_or_colleague",
            "advertisement",
            "other",
        ],
    )
        .optional(),
    subscribeToNewsletter: z.boolean().optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>