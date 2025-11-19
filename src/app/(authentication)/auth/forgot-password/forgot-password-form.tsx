"use client"

import { config } from "@/config"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Logo from "@/components/common/Logo"
import AuthFormFooter from "@/app/(authentication)/_component/AuthFormFooter"
import { useCallback, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { EmailFormData, emailSchema } from "@/db/schemas/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { authClient } from "@/lib/authClient"
import { toast } from "sonner"

export function ForgotPasswordForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const [isPending, startTransition] = useTransition()
	const [error, setError] = useState<string | null>(null)
	const router = useRouter()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<EmailFormData>({
		resolver: zodResolver(emailSchema),
		defaultValues: { email: "" },
		mode: "onTouched",
	})

	const handleSubmitForm: SubmitHandler<EmailFormData> = useCallback(
		async (data) => {
			setError(null)

			startTransition(async () => {
				try {
					await authClient.requestPasswordReset(
						{
							email: data.email,
							redirectTo: `${config.BASE_URL}`,
						},
						{
							async onSuccess() {
								toast.success("Reset Token Sent", {
									description: `A new password reset email has been sent to your email: ${data.email}!`,
								})
								router.push("/auth/login")
								reset()
							},
							onError(context) {
								toast.error("Reset Error", {
									description:
										context.error.message ||
										context.error.statusText,
								})
								setError(
									context.error.message ||
										"Failed to send password reset token."
								)
							},
						}
					)
				} catch (err) {
					setError("Reset failed. Please try again.")
					console.error("Reset error:", err)
				}
			})
		},
		[router, reset]
	)
	return (
		<div
			className={cn("flex flex-col gap-6", className)}
			{...props}
		>
			<form
				className="w-full"
				onSubmit={handleSubmit(handleSubmitForm)}
			>
				{error && (
					<p className="bg-red-200 text-red-500 text-sm text-center p-2 rounded-md">
						{error}
					</p>
				)}
				<FieldGroup>
					<div className="flex flex-col items-center gap-2 text-center">
						<Link
							href="/"
							className="flex flex-col items-center gap-2 font-medium"
						>
							<div className="flex items-center justify-center rounded-md">
								<Logo />
							</div>
							<span className="sr-only">{config.TITLE}.</span>
						</Link>
						<h1 className="text-xl font-bold">Forgot Password?</h1>
						<FieldDescription>
							No worries we&apos;ll send you reset instructions
						</FieldDescription>
					</div>
					<Field>
						<FieldLabel htmlFor="email">Email</FieldLabel>
						<Input
							id="email"
							type="email"
							autoFocus={true}
							placeholder="m@example.com"
							required
							{...register("email")}
							disabled={isPending}
						/>
						{errors.email && (
							<p className="text-red-500 text-sm">
								{errors.email.message}
							</p>
						)}
					</Field>
					<Field>
						<Button
							type="submit"
							disabled={isPending}
						>
							{isPending ? "Processing..." : "Reset Password"}
						</Button>
					</Field>
					<FieldDescription className="text-center mt-2">
						<Link href="/auth/login">Return?</Link>
					</FieldDescription>
					<FieldSeparator></FieldSeparator>
				</FieldGroup>
			</form>
			<AuthFormFooter />
		</div>
	)
}
