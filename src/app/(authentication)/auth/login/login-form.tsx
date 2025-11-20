"use client"

import { Eye, EyeOff, Fingerprint } from "lucide-react"
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
import { useCallback, useEffect, useState, useTransition } from "react"
import Link from "next/link"
import Logo from "@/components/common/Logo"
import AuthFormFooter from "@/app/(authentication)/_component/AuthFormFooter"
import { IconBrandLinkedin } from "@tabler/icons-react"
import { authClient } from "@/lib/authClient"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import { EmailFormData, LoginFormData, loginSchema } from "@/db/schemas/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { checkEmailExists } from "@/actions/auth"

export function LoginForm({ className, ...props }: LoginFormProps) {
	const { refetch } = authClient.useSession()
	const [isPending, startTransition] = useTransition()
	const [revealPassword, setRevealPassword] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const router = useRouter()

	// Single form for both email verification and login
	const {
		control,
		handleSubmit,
		setValue,
		setFocus,
		reset,
		trigger,
		getValues,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: "", password: "" },
		mode: "onTouched",
	})

	// Called when user submits the email to check if it exists
	const handleEmailVerify = useCallback(
		async (payload: EmailFormData) => {
			setError(null)

			startTransition(async () => {
				try {
					const response = await checkEmailExists({
						email: payload.email,
					})
					if (!response.status)
						throw new Error(response.error || "Unknown")

					const exists = response.data

					if (!exists) {
						toast.info("Registration Required", {
							description:
								"You do not have an account with us. Please signup to start benefiting.",
						})
						router.push("/auth/signup")
					} else {
						setValue("email", payload.email, {
							shouldDirty: true,
							shouldTouch: true,
						})
						setShowPassword(true)
						setTimeout(() => setFocus("password"), 0)
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

	// Called when the final login form is submitted
	const handleLogin: SubmitHandler<LoginFormData> = useCallback(
		async (data) => {
			setError(null)

			startTransition(async () => {
				try {
					await authClient.signIn.email(
						{
							email: data.email,
							password: data.password,
							callbackURL: `${config.BASE_URL}/dashboard`,
						},
						{
							async onSuccess(context) {
								toast.info("Login Successful", {
									description:
										"You have successfully logged in.",
								})
								if (context.data.twoFactorRedirect) {
									await authClient.twoFactor.sendOtp(
										{},
										{
											onSuccess() {
												router.push("/auth/otp")
												reset()
											},
											onError() {
												toast.error("OTP Error", {
													description:
														"Failed to send OTP for two-factor authentication. Please try logging in again.",
												})
												router.push("/auth/login")
												reset()
											},
										}
									)
								} else {
									refetch()
									router.push("/dashboard")
									toast.success("Authentication Successful", {
										description:
											"You have been authenticated and can now see your dashboard.",
									})
									reset()
								}
							},
							onError(context) {
								toast.error("Authentication Error", {
									description:
										context.error.message ||
										"There was an error authenticating your account. Please try again.",
								})
								setError("Login failed. Please try again.")
							},
						}
					)
				} catch (err) {
					setError("Login failed. Please try again.")
					console.error("Login error:", err)
				}
			})
		},
		[router, reset, refetch]
	)

	const handleGoogleSignin = useCallback(async () => {
		startTransition(async () => {
			try {
				await authClient.signIn.social({
					provider: "google",
					callbackURL: `${config.BASE_URL}/dashboard`,
				})
			} catch (err) {
				setError("Google sign-in failed. Please try again.")
				console.error("Google sign-in error:", err)
			}
		})
	}, [])

	const handleLinkedinSignin = useCallback(async () => {
		startTransition(async () => {
			try {
				await authClient.signIn.social({
					provider: "linkedin",
					callbackURL: `${config.BASE_URL}/dashboard`,
				})
			} catch (err) {
				setError("LinkedIn sign-in failed. Please try again.")
				console.error("LinkedIn sign-in error:", err)
			}
		})
	}, [])

	const handlePasskeyAuthentiication = useCallback(async () => {
		startTransition(async () => {
			try {
				// With post authentication redirect
				await authClient.signIn.passkey(
					{},
					{
						onSuccess() {
							refetch()
							toast.success("Authentication Successful", {
								description:
									"You have successfully logged into your account with passkey.",
							})
							// Redirect to dashboard after successful authentication
							router.push("/dashboard")
						},
						onError(context) {
							// Handle authentication errors
							toast.error("Authentication failed", {
								description: context.error.message,
							})
						},
					}
				)
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (error: any) {
				setError(
					"Passkey Error: " +
						`${error.message || "There was an error signing in with your passkey. Please try again."}`
				)
			}
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		authClient.signIn.passkey(
			{ autoFill: true },
			{
				onSuccess() {
					refetch()
					router.push("/dashboard")
				},
			}
		)
	}, [router, refetch])

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
						handleSubmit(handleLogin)(e)
					}
				}}
			>
				{error && (
					<p className="bg-red-200 text-red-500 text-sm text-center p-2 rounded-md">
						{error}
					</p>
				)}
				<FieldGroup className="w-full">
					<div className="flex flex-col items-center gap-2 text-center">
						<Link
							href="/"
							className="flex flex-col items-center gap-2 font-medium"
						>
							<div className="flex items-center justify-center rounded-md">
								<Logo />
							</div>
							<span className="sr-only">{config.TITLE}</span>
						</Link>
						<h1 className="text-xl font-bold">
							Welcome to {config.TITLE}
						</h1>
						<FieldDescription>
							Don&apos;t have an account?{" "}
							<Link href="/auth/signup">Sign up</Link>
						</FieldDescription>
					</div>

					<Field>
						<FieldLabel htmlFor="email">Email</FieldLabel>
						<Controller
							control={control}
							name="email"
							render={({ field }) => (
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									autoComplete="email webauthn"
									autoFocus={true}
									value={field.value}
									onChange={field.onChange}
									disabled={isPending}
									readOnly={showPassword}
								/>
							)}
						/>
						{errors.email && (
							<p className="text-red-500 text-sm">
								{errors.email.message}
							</p>
						)}
					</Field>

					{showPassword && (
						<Field className="relative w-full">
							<FieldLabel htmlFor="password">Password</FieldLabel>
							<Controller
								control={control}
								name="password"
								render={({ field }) => (
									<div className="relative">
										<Input
											id="password"
											type={
												revealPassword
													? "text"
													: "password"
											}
											placeholder="Enter your password"
											value={field.value}
											onChange={field.onChange}
											disabled={isPending || isSubmitting}
										/>
										<button
											type="button"
											className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
											onClick={() =>
												setRevealPassword(
													!revealPassword
												)
											}
											aria-label={
												revealPassword
													? "Hide password"
													: "Show password"
											}
										>
											{revealPassword ? (
												<EyeOff className="h-4 w-4" />
											) : (
												<Eye className="h-4 w-4" />
											)}
										</button>
									</div>
								)}
							/>
							{errors.password && (
								<p className="text-red-500 text-sm bg-red-200 p-2 rounded-md">
									{errors.password.message}
								</p>
							)}
						</Field>
					)}
					<Field>
						<Button
							type="submit"
							disabled={isPending || isSubmitting}
						>
							{isPending || isSubmitting
								? "Processing..."
								: showPassword
									? "Sign In"
									: "Continue"}
						</Button>
					</Field>

					{showPassword && (
						<FieldDescription className="text-center mt-2">
							Forgotten your password?{" "}
							<Link
								href="/auth/forgot-password"
								className={
									isPending
										? "pointer-events-none opacity-50"
										: ""
								}
							>
								Request a new one.
							</Link>
						</FieldDescription>
					)}

					<FieldSeparator>Or</FieldSeparator>
					<Field className="grid gap-4 sm:grid-cols-2">
						<Button
							variant="outline"
							type="button"
							onClick={handleLinkedinSignin}
							disabled={isPending}
						>
							<IconBrandLinkedin
								size={20}
								className="mr-2"
							/>
							Continue with LinkedIn
						</Button>
						<Button
							variant="outline"
							type="button"
							onClick={handleGoogleSignin}
							disabled={isPending}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								className="w-5 h-5 mr-2"
							>
								<path
									d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
									fill="currentColor"
								/>
							</svg>
							Continue with Google
						</Button>
					</Field>
					<Field>
						<Button
							variant="outline"
							type="button"
							onClick={handlePasskeyAuthentiication}
							disabled={isPending}
						>
							<Fingerprint
								size={20}
								className="w-7 h-7"
							/>
							Passkey Login
						</Button>
					</Field>
				</FieldGroup>
			</form>
			<AuthFormFooter />
		</div>
	)
}
