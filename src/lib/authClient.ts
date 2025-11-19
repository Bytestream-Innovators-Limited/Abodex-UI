import { config } from "@/config"
import { createAuthClient } from "better-auth/react"
import { adminClient, emailOTPClient, organizationClient, inferAdditionalFields, lastLoginMethodClient, multiSessionClient, passkeyClient, twoFactorClient } from "better-auth/client/plugins"
import { auth } from "./auth";

export const authClient = createAuthClient({
    baseURL: config.BASE_URL,
    plugins: [
        twoFactorClient({
            onTwoFactorRedirect() {
                window.location.href = "/auth/otp";
            },
        }),
        adminClient(),
        organizationClient(),
        emailOTPClient(),
        passkeyClient(),
        multiSessionClient(),
        lastLoginMethodClient(),
        inferAdditionalFields<typeof auth>(),
    ],
    fetchOptions: {
        onError(e) {
            if (e.error.status === 429) {
                alert("Too many requests. Please try again later.");
            }
        },
    },
})