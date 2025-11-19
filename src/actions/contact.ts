"use server"

import { ContactFormData } from "@/app/(static)/contact/_zod/contact"

export async function sendContactEmail(data: ContactFormData) {
    // Here, you would integrate with your email service provider.
    // For demonstration, we'll just log the data.
    console.log("Sending contact email with data:", data)
    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return { success: true }
}