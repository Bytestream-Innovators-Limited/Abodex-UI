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
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp"
import Logo from "@/components/common/Logo"
import AuthFormFooter from "@/app/(authentication)/_component/AuthFormFooter"
import { useCallback, useState, useTransition } from "react"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/authClient"
import { toast } from "sonner"
import * as z from "zod"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import Link from "next/link"

type OTPFormProps = { className?: string }

// Define the schema for OTP form
const otpSchema = z.object({
	otp: z
		.string()
		.length(6, { message: "Verification code must be 6 digits" })
		.regex(/^\d{6}$/, {
			message: "Verification code must contain only digits",
		}),
})

type OTPFormData = z.infer<typeof otpSchema>

export function OTPForm({ className, ...props }: OTPFormProps) {
	// useTransition returns [isPending, startTransition]
	const [isPending, startTransition] = useTransition()
	const [error, setError] = useState<string | null>(null)
	const router = useRouter()

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<OTPFormData>({
		resolver: zodResolver(otpSchema),
		defaultValues: { otp: "" },
		mode: "onTouched",
	})

	// Called when the form is submitted
	const handleVerify: SubmitHandler<OTPFormData> = useCallback(
		async (data) => {
			setError(null)

			startTransition(async () => {
				try {
					await authClient.twoFactor.verifyTotp(
						{
							code: data.otp,
							trustDevice: true,
						},
						{
							async onSuccess() {
								toast.success("Verification Successful", {
									description:
										"Two-factor authentication verified successfully!",
								})
								router.push("/dashboard")
								reset()
							},
							onError(context) {
								toast.error("Verification Error", {
									description:
										context.error.message ||
										context.error.statusText ||
										"Invalid verification code",
								})
								setError(
									"Invalid verification code. Please try again."
								)
							},
						}
					)
				} catch (err) {
					setError("Verification failed. Please try again.")
					console.error("Verification error:", err)
				}
			})
		},
		[router, reset]
	)

	// Handle resend verification code
	const handleResend = useCallback(
		async (e: React.MouseEvent<HTMLAnchorElement>) => {
			e.preventDefault()
			setError(null)

			startTransition(async () => {
				try {
					await authClient.twoFactor.sendOtp(
						{},
						{
							async onSuccess() {
								toast.success("OTP Resent", {
									description:
										"A new verification code has been sent!",
								})
							},
							onError(context) {
								toast.error("Resend Error", {
									description:
										context.error.message ||
										context.error.statusText ||
										"Failed to resend OTP",
								})
								setError("Failed to resend OTP.")
							},
						}
					)
				} catch (err) {
					setError("Resend failed. Please try again.")
					console.error("Resend error:", err)
				}
			})
		},
		[]
	)

	return (
		<div
			className={cn("flex flex-col gap-6", className)}
			{...props}
		>
			<form
				className="w-full"
				onSubmit={handleSubmit(handleVerify)}
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
							<span className="sr-only">{config.TITLE}.</span>
						</Link>
						<h1 className="text-xl font-bold">
							Enter verification code
						</h1>
						<FieldDescription>
							We sent a 6-digit code to your email address
						</FieldDescription>
					</div>

					<Field>
						<FieldLabel
							htmlFor="otp"
							className="sr-only"
						>
							OTP Verification code
						</FieldLabel>
						<Controller
							control={control}
							name="otp"
							render={({ field }) => (
								<InputOTP
									pattern={REGEXP_ONLY_DIGITS}
									maxLength={6}
									id="otp"
									value={field.value}
									onChange={field.onChange}
									disabled={isPending}
									containerClassName="gap-4"
								>
									<InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
										<InputOTPSlot index={0} />
										<InputOTPSlot index={1} />
										<InputOTPSlot index={2} />
									</InputOTPGroup>
									<InputOTPSeparator />
									<InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
										<InputOTPSlot index={3} />
										<InputOTPSlot index={4} />
										<InputOTPSlot index={5} />
									</InputOTPGroup>
								</InputOTP>
							)}
						/>
						{errors.otp && (
							<p className="text-red-500 text-sm mt-2 bg-red-200 p-2 rounded-md">
								{errors.otp.message}
							</p>
						)}
						<FieldDescription className="text-center mt-2">
							Didn&apos;t receive the code?{" "}
							<a
								href="#"
								onClick={handleResend}
								className={
									isPending
										? "pointer-events-none opacity-50"
										: ""
								}
							>
								Resend
							</a>
						</FieldDescription>
					</Field>

					<Field>
						<Button
							type="submit"
							disabled={isPending}
						>
							{isPending ? "Processing..." : "Verify"}
						</Button>
					</Field>
				</FieldGroup>
			</form>
			<AuthFormFooter />
		</div>
	)
}
