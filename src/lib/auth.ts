import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/db"; // your drizzle instance
import { config } from "@/config";

// Plugins
import { passkey } from "better-auth/plugins/passkey"
import { multiSession } from "better-auth/plugins/multi-session";
import { nextCookies } from "better-auth/next-js";
import { twoFactor } from "better-auth/plugins/two-factor";
import { admin, emailOTP, lastLoginMethod, openAPI, organization } from "better-auth/plugins"

// Email Templtes
import { OTPEmailHTML } from "@/components/emails/otpEmail";
import { VerifyEmailHTML } from "@/components/emails/verifyEmail";
import { ResetPasswordEmailHTML } from "@/components/emails/resetPassword";
import { inngest } from "@/inngest/client";
import { member } from "@/db/models";
import { desc, eq } from "drizzle-orm";

export const auth = betterAuth({
    appName: config.TITLE,
    baseURL: config.BASE_URL,
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
    }),
    plugins: [
        emailOTP({
            async sendVerificationOTP(data) {
                if (data.type === "sign-in") {
                    const emailHtml = await OTPEmailHTML({
                        username: data.email.split("@")[1],
                        otp: data.otp
                    })
                    await inngest.send({
                        name: "marketing/email",
                        data: {
                            html: emailHtml,
                            to: data.email,
                            subject: "Abodex - One Time Password"
                        }
                    })
                }
            },
        }),
        admin({
            adminRoles: ["admin", "superuser"],
            impersonationSessionDuration: 60 * 60 * 24,
            defaultBanReason: "Spamming",
            defaultBanExpiresIn: 60 * 60 * 24,
        }),
        passkey(),
        organization({
            disableOrganizationDeletion: true,
        }),
        openAPI(),
        multiSession(),
        nextCookies(),
        lastLoginMethod(),
        twoFactor({
            issuer: config.TITLE,
            otpOptions: {
                async sendOTP({ user, otp }) {
                    const emailHtml = await OTPEmailHTML({
                        username: user.name,
                        otp
                    })
                    await inngest.send({
                        name: "marketing/email",
                        data: {
                            html: emailHtml,
                            to: user.email,
                            subject: "Abodex - One Time Password"
                        }
                    })
                },
            },
        }),
    ],
    user: {
        additionalFields: {
            subscribed: {
                type: "boolean",
                defaultValue: false
            }
        }
    },
    emailVerification: {
        autoSignInAfterVerification: true,
        sendOnSignUp: true,
        sendOnSignIn: true,
        async sendVerificationEmail(data) {
            const user = data.user
            const token = data.token
            const emailHtml = await VerifyEmailHTML({
                username: user.name,
                verifyLink: `${config.BASE_URL}/auth/verify-email?token=${token}`
            })
            // ! Important: add queue email sending here for nodemailer
            await inngest.send({
                name: "marketing/email",
                data: {
                    html: emailHtml,
                    to: user.email,
                    subject: "Abodex - Verify Your Email"
                }
            })
        },
        // After email verification create the relationships to other tables like wallet and landlord
        // async afterEmailVerification(user, request) {

        // },
    },
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        revokeSessionsOnPasswordReset: true,
        async sendResetPassword(data) {
            const user = data.user
            const token = data.token
            const emailHtml = await ResetPasswordEmailHTML({
                username: user.name,
                token
            })
            // ! Important: add queue email sending here for nodemailer
            await inngest.send({
                name: "marketing/email",
                data: {
                    html: emailHtml,
                    to: user.email,
                    subject: "Abodex - Reset Your Password"
                }
            })
        },
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60 // Cache duration in seconds
        }
    },
    socialProviders: {
        google: config.GOOGLE_CLIENT_ID ? {
            prompt: "select_account",
            clientId: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SK
        } : undefined,
        linkedin: config.LINKEDIN_CLIENT_ID ? {
            clientId: config.LINKEDIN_CLIENT_ID,
            clientSecret: config.LINKEDIN_CLIENT_SK,
        } : undefined,
    },
    databaseHooks: {
        session: {
            create: {
                before: async (session) => {
                    const membership = await db.query.member.findFirst({
                        where: eq(member.userId, session.userId),
                        orderBy: desc(member.createdAt),
                        columns: { organizationId: true },
                    })

                    return {
                        data: {
                            ...session,
                            activeOrganizationId: membership?.organizationId || null,
                        }
                    }
                }
            }
        }
    },
    trustedOrigins: config.TRUSTED_ORIGINS
});

export type AuthSession = typeof auth.$Infer.Session
export type AuthUser = typeof auth.$Infer.Session.user