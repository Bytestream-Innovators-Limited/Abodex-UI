import { inngest } from "./client";
import sendMail, { sendBulkEmail } from "@/lib/mailer"; // Adjust import path based on your project structure
import { config } from "@/config";

/**
 * Inngest function to send a single email.
 * Triggers on the "marketing/email" event and uses the existing sendMail function.
 * @inngest.function
 * @param {Object} options - Inngest function options.
 * @param {string} options.id - The unique identifier for the function.
 * @param {Object} options.event - The event configuration to trigger the function.
 * @param {string} options.event.event - The event name to listen for.
 * @param {Object} params - Function parameters from Inngest.
 * @param {import("inngest").EventPayload} params.event - The event payload containing data (e.g., email).
 * @param {import("inngest").Step} params.step - The step object for async operations.
 * @example
 * ```typescript
 * // Trigger the function
 * await inngest.send({
 *   name: "marketing/email",
 *   data: { email: "user@example.com" }
 * });
 * ```
 * @returns {Promise<{ message: string }>} A promise resolving to a success message.
 */
export const sendEmailInngest = inngest.createFunction(
    { id: "email" },
    { event: "marketing/email" },
    async ({ event, step }) => {
        // Wait for 1 second before sending (e.g., for rate limiting or delay)
        await step.sleep("wait-a-moment", "1s");

        const { to, html, subject } = event.data;

        const mailProps: SendMailProps = {
            to,
            subject,
            html,
            from: config.FROM_EMAIL,
        };

        try {
            await sendMail(mailProps);
            return { message: `Email sent successfully to ${to}` };
        } catch (error) {
            console.error("Failed to send email:", error);
            throw new Error(`Email sending failed for ${to}: ${error}`);
        }
    }
);

/**
 * Inngest function to send bulk emails.
 * Triggers on the "marketing/bulk-email" event and uses the existing sendBulkEmail function.
 * @inngest.function
 * @param {Object} options - Inngest function options.
 * @param {string} options.id - The unique identifier for the function.
 * @param {Object} options.event - The event configuration to trigger the function.
 * @param {string} options.event.event - The event name to listen for.
 * @param {Object} params - Function parameters from Inngest.
 * @param {import("inngest").EventPayload} params.event - The event payload containing data (e.g., recipients).
 * @param {import("inngest").Step} params.step - The step object for async operations.
 * @example
 * ```typescript
 * // Trigger the function
 * await inngest.send({
 *   name: "marketing/bulk-email",
 *   data: {
 *     subject: "Monthly Newsletter",
 *     html: "<h1>Newsletter</h1><p>Check our updates.</p>",
 *     recipients: [
 *       { email: "user1@example.com", name: "User One" },
 *       { email: "user2@example.com", name: "User Two" }
 *     ]
 *   }
 * });
 * ```
 * @returns {Promise<{ message: string }>} A promise resolving to a success message.
 */
export const sendBulkEmailInngest = inngest.createFunction(
    { id: "bulk-email" },
    { event: "marketing/bulk-email" },
    async ({ event, step }) => {
        // Wait for 1 second before sending bulk emails (e.g., to stagger requests)
        await step.sleep("wait-a-moment", "1s");

        const { subject, html, recipients, attachment } = event.data;

        const mailProps: SendBulkMailProps = {
            subject,
            html,
            recipients,
            attachment,
            from: config.FROM_EMAIL, // Default from email from config
        };

        try {
            await sendBulkEmail(mailProps);
            return { message: `Bulk email sent successfully to ${recipients.length} recipients` };
        } catch (error) {
            console.error("Failed to send bulk email:", error);
            throw new Error(`Bulk email sending failed: ${error}`);
        }
    }
);