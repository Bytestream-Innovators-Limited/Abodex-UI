"use client"

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
import { config } from "@/config"
import AuthFormFooter from "../../_component/AuthFormFooter"
import { SignupFormData, signupSchema } from "@/db/schemas/auth"
import { useCallback, useState, useTransition } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { checkEmailExists } from "@/actions/auth"
import { IconEye, IconEyeOff } from "@tabler/icons-react"
import { authClient } from "@/lib/authClient"
import { toast } from "sonner"

type SignupFormProps = { className?: string }

export function SignupForm({ className, ...props }: SignupFormProps) {
	// useTransition returns [isPending, startTransition]
	const [isPending, startTransition] = useTransition()
	const [revealPassword, setRevealPassword] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const router = useRouter()

	// Single form for both email verification + signup
	const {
		register,
		handleSubmit,
		setValue,
		setFocus,
		reset,
		trigger,
		getValues,
		formState: { errors, isSubmitting },
	} = useForm<SignupFormData>({
		resolver: zodResolver(signupSchema),
		defaultValues: { email: "", password: "" },
		mode: "onTouched",
	})

	// Called when user submits the email to check if it exists
	const handleEmailVerify = useCallback(
		async (payload: { email: string }) => {
			setError(null)

			// mark as a transition (so isPending toggles)
			startTransition(async () => {
				try {
					const response = await checkEmailExists({
						email: payload.email,
					})
					if (!response.status)
						throw new Error(response.error || "Unknown")

					const exists = response.data

					if (exists) {
						// email already used -> redirect to login
						toast.info("Account Exists", {
							description:
								"You already own an account with us. Please login!",
						})
						router.push("/auth/login")
					} else {
						// email not used -> reveal password field and prefill email in form state
						// setValue will keep the field registered for react-hook-form
						setValue("email", payload.email, {
							shouldDirty: true,
							shouldTouch: true,
						})
						setShowPassword(true)

						// focus password next tick
						setTimeout(() => setFocus("password"), 0)

						// optionally trigger validation on email so form state is valid
						await trigger("email")
					}
				} catch (err) {
					setError("An error occurred. Please try again.")
					console.error("Email check error:", err)
				}
			})
		},
		[router, setValue, setFocus, trigger]
	)

	// Called when the final signup form is submitted
	const handleSignup: SubmitHandler<SignupFormData> = useCallback(
		async (data) => {
			setError(null)

			startTransition(async () => {
				try {
					await authClient.signUp.email(
						{
							name: data.name,
							email: data.email,
							password: data.password,
							callbackURL: `${config.BASE_URL}/dashboard`,
						},
						{
							async onSuccess(context) {
								console.log(context)
								toast.success("Registration Successful", {
									description: `A verification email has been sent to your email: ${data.email}!`,
								})
								router.push("/auth/resend-verification")
								reset()
							},
							onError(context) {
								toast.error("Registration Error", {
									description:
										context.error.message ||
										context.error.statusText,
								})
							},
						}
					)
				} catch (err) {
					setError("Signup failed. Please try again.")
					console.error("Signup error:", err)
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
				onSubmit={(e) => {
					e.preventDefault()
					if (!showPassword) {
						trigger("email").then((valid) => {
							if (valid) {
								const { email } = getValues()
								handleEmailVerify({ email })
							}
						})
					} else {
						handleSubmit(handleSignup)(e)
					}
				}}
			>
				{error && (
					<div className="bg-red-200 p-1.5  text-red-500 text-sm text-center">
						{error}
					</div>
				)}

				<FieldGroup className="w-full">
					<div className="flex flex-col items-center gap-2 text-center">
						<Link
							href="/"
							className="flex flex-col items-center gap-2 font-medium"
						>
							<div className="flex items-center justify-center ">
								<Logo />
							</div>
							<span className="sr-only">{config.TITLE}.</span>
						</Link>
						<h1 className="text-xl font-bold">
							Hello there, Welcome to {config.TITLE}.
						</h1>
						<FieldDescription>
							Already have an account?{" "}
							<Link href="/auth/login">Sign in</Link>
						</FieldDescription>
					</div>

					{/* Email input stays registered; when showPassword is true we make it readOnly (not disabled)
              so its value remains in form state and validation still works. */}
					<Field>
						<FieldLabel htmlFor="email">Email</FieldLabel>
						<Input
							id="email"
							type="email"
							placeholder="m@example.com"
							{...register("email")}
							// while verifying submission is pending, disable interaction
							disabled={isPending}
							// once we show password we only want the email read-only (so it stays submitted)
							readOnly={showPassword}
						/>
						{errors.email && (
							<p className="text-red-500 text-xs">
								{errors.email.message}
							</p>
						)}
					</Field>

					<Field>
						<FieldLabel htmlFor="name">
							Name
						</FieldLabel>
						<Input
							id="name"
							type="text"
							placeholder="John Doe"
							autoCapitalize="words"
							{...register("name")}
							// while verifying submission is pending, disable interaction
							disabled={isPending}
						/>
						{errors.name && (
							<p className="text-red-500 text-xs">
								{errors.name.message}
							</p>
						)}
					</Field>

					{showPassword && (
						<Field className="relative w-full">
							<FieldLabel htmlFor="password">Password</FieldLabel>
							<div className="relative w-full">
								<Input
									id="password"
									className="w-full"
									// revealPassword true => show password text
									type={revealPassword ? "text" : "password"}
									placeholder="Enter your password"
									{...register("password")}
									disabled={isPending || isSubmitting}
								/>

								<button
									className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2"
									type="button"
									onClick={() =>
										setRevealPassword(!revealPassword)
									}
									aria-label={
										revealPassword
											? "Hide password"
											: "Show password"
									}
								>
									{revealPassword ? (
										<IconEyeOff
											className="w-6 h-6"
											size={20}
										/>
									) : (
										<IconEye
											className="w-6 h-6"
											size={20}
										/>
									)}
								</button>
							</div>
							{errors.password && (
								<p className="text-red-500 text-xs">
									{errors.password.message}
								</p>
							)}
						</Field>
					)}

					<Field>
						<Button
							type="submit"
							// disabled while the transition or RHF submission is active
							disabled={isPending || isSubmitting}
						>
							{isPending || isSubmitting
								? "Processing..."
								: showPassword
									? "Sign Up"
									: "Create Account"}
						</Button>
					</Field>
				</FieldGroup>
			</form>

			<AuthFormFooter />
		</div>
	)
}
