import z from "zod"

export const changePasswordSchema = z.object({
    newPassword: z.string().min(8, "Password must be at least 8 characters")
        .nonempty("Password is required"),
    currentPassword: z.string(),
    revokeOtherSessions: z.boolean().optional()
})

export type ChangePasswordDTO = z.infer<typeof changePasswordSchema>;

export const addpasskeySchema = z.object({
    name: z.string().min(3, "Your asskeey must have a name")
})

export type AddPasskeyDTO = z.infer<typeof addpasskeySchema>;

export const twoFactorCodeSchema = z.object({
    code: z
        .string()
        .min(6, "Code must be at least 6 characters")
        .nonempty("Code is required"),
})

export type TwoFactorCodeDTO = z.infer<typeof twoFactorCodeSchema>;