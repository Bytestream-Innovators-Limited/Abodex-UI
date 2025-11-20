"use client"

import { config } from "@/config"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Logo from "@/components/common/Logo"
import AuthFormFooter from "@/app/(authentication)/_component/AuthFormFooter"
import { useCallback, useState, useTransition } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/authClient"
import { toast } from "sonner"
import { EmailFormData, emailSchema } from "@/db/schemas/auth"

type ResendVerificationFormProps = { className?: string }

export function ResendVerificationForm({
	className,
	...props
}: ResendVerificationFormProps) {
	// useTransition returns [isPending, startTransition]
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

	// Called when the form is submitted
	const handleResend: SubmitHandler<EmailFormData> = useCallback(
		async (data) => {
			setError(null)

			startTransition(async () => {
				try {
					await authClient.sendVerificationEmail(
						{
							email: data.email,
							callbackURL: `${config.BASE_URL}/dashboard`,
						},
						{
							async onSuccess(context) {
								toast.success("Verification Email Sent", {
									description: `A new verification email has been sent to your email: ${data.email}!`,
								})
								router.push("/auth/login")
								reset()
							},
							onError(context) {
								toast.error("Resend Error", {
									description:
										context.error.message ||
										context.error.statusText,
								})
								setError(
									context.error.message ||
										"Failed to resend verification email."
								)
							},
						}
					)
				} catch (err) {
					setError("Resend failed. Please try again.")
					console.error("Resend error:", err)
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
				onSubmit={handleSubmit(handleResend)}
			>
				<FieldGroup className="w-full">
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
						<h1 className="text-xl font-bold">
							Resend Verification Email
						</h1>
						<FieldDescription>
							Send a new verification token to your email.
						</FieldDescription>
					</div>

					<Field>
						<FieldLabel htmlFor="email">Email</FieldLabel>
						<Input
							id="email"
							type="email"
							autoFocus={true}
							required
							placeholder="m@example.com"
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
							{isPending
								? "Processing..."
								: "Resend Verification"}
						</Button>
					</Field>

					<FieldDescription className="text-center mt-2">
						<Link href="/auth/login">Return?</Link>
					</FieldDescription>

					{error && <p className="text-red-500 text-sm">{error}</p>}
				</FieldGroup>
			</form>
			<AuthFormFooter />
		</div>
	)
}
