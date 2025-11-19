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
import {
	PasswordFormData,
	passwordSchema,
} from "@/db/schemas/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { authClient } from "@/lib/authClient"
import { toast } from "sonner"
import { Eye, EyeOff } from "lucide-react"

export function ResetPasswordForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const [isPending, startTransition] = useTransition()
	const [showPassword, setShowPassword] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const router = useRouter()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<PasswordFormData>({
		resolver: zodResolver(passwordSchema),
		defaultValues: { password: "" },
		mode: "onTouched",
	})

	const handleSubmitForm: SubmitHandler<PasswordFormData> = useCallback(
		async (data) => {
			setError(null)

			startTransition(async () => {
				try {
					const token = new URLSearchParams(
						window.location.search
					).get("token")

					if (!token) {
						reset()
						return
					}

					await authClient.resetPassword(
						{
							newPassword: data.password,
							token,
						},
						{
							async onSuccess() {
								toast.success("Reset Password", {
									description: `Successfully reset your password!`,
								})
								router.push("/auth/login")
								reset()
							},
							onError(context) {
								toast.error("Reset Password", {
									description:
										context.error.message ||
										context.error.statusText,
								})
								setError(
									context.error.message ||
										"Failed to reset your password."
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
						<FieldLabel htmlFor="password">Password</FieldLabel>
						<div className="relative">
							<Input
								id="password"
								type={showPassword ? "text" : "password"}
								placeholder="Enter your password"
								{...register("password")}
								disabled={isPending}
							/>
							<button
								type="button"
								className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? (
									<EyeOff className="h-4 w-4" />
								) : (
									<Eye className="h-4 w-4" />
								)}
							</button>
						</div>
						{errors.password && (
							<p className="text-red-500 text-sm bg-red-200 p-2 rounded-md">
								{errors.password.message}
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
