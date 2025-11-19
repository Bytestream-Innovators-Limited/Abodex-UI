import z from "zod"

export const formSchema = z.object({
    email: z.email({
        message: "Please enter a valid email address.",
    }),
    question: z.string().min(10, {
        message: "Your question must be at least 10 characters long.",
    }).max(500, {
        message: "Your question cannot exceed 500 characters.",
    }),
})

export type FormValues = z.infer<typeof formSchema>