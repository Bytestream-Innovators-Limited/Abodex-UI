"use server"

import db from "@/db/index"
import { user, wallet } from "@/db/models"
import { eq } from "drizzle-orm";
import { v4 as uuid4 } from "uuid"
/**
 * Server action to check if an email exists in the users table.
 * @param {Object} formData - Form data containing the email.
 * @param {string} formData.email - The email to check.
 * @returns {Promise<{ exists: boolean; error?: string }>} A promise resolving to an object indicating if the email exists and any error message.
 * @throws {Error} If the database query fails.
 * @example
 * ```tsx
 * // Usage in a form action
 * "use server";
 * import { checkEmailExists } from "@/actions/check-email";
 *
 * export async function action(formData: FormData) {
 *   const email = formData.get("email") as string;
 *   const result = await checkEmailExists({ email });
 *   if (result.error) throw new Error(result.error);
 *   return result.exists;
 * }
 * ```
 */
export async function checkEmailExists({
    email,
}: {
    email: string;
}): Promise<{ status: boolean, data: boolean; error?: string }> {
    try {
        // Assume users table is defined in schemas with an email column
        const result = await db
            .query.user.findFirst({
                where: eq(user.email, email)
            })

        const data = result !== undefined
        return { status: true, data };
    } catch (error) {
        console.error("Error checking email existence:", error);
        return { status: false, data: false, error: "Failed to check email existence" };
    }
}

export async function createWallet({
    userId,
}: {
    userId: string;
}): Promise<{ status: boolean, data: boolean; error?: string }> {
    try {
        // Assume users table is defined in schemas with an email column
        const result = await db.insert(wallet).values({
            id: uuid4(),
            userId,
            createdAt: new Date()
        }).returning()

        const data = result !== undefined
        return { status: true, data };
    } catch (error) {
        console.error("Error creataing wallet:", error);
        return { status: false, data: false, error: "Failed to create a wallet for user" };
    }
}