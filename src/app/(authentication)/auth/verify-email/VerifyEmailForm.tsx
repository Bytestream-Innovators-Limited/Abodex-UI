"use client"

import { config } from "@/config"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FieldGroup, FieldDescription } from "@/components/ui/field"
import Logo from "@/components/common/Logo"
import AuthFormFooter from "../../_component/AuthFormFooter"
import { useEffect, useState, Suspense } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/authClient"
import { toast } from "sonner"
import { z } from "zod"
import Link from "next/link"

const verifySchema = z.object({
	token: z.string().min(1, { message: "Verification token is required" }),
})

type VerifyFormData = z.infer<typeof verifySchema>

function VerifyEmailContent() {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isVerified, setIsVerified] = useState(false)
	const [token, setToken] = useState<string | null>(null)
	const router = useRouter()

	const form = useForm<VerifyFormData>({
		resolver: zodResolver(verifySchema),
		defaultValues: {
			token: "",
		},
	})

	const {
		control,
		handleSubmit,
		setValue,
		setError,
		formState: { errors },
	} = form

	// Handle email verification
	async function onSubmit(data: VerifyFormData) {
		setIsSubmitting(true)
		try {
			await authClient.verifyEmail(
				{
					query: {
						token: data.token,
					},
				},
				{
					async onSuccess() {
						toast.success("Email Verified", {
							description:
								"Your email has been successfully verified!",
						})
						setIsVerified(true)
						router.push("/dashboard")
					},
					onError(context) {
						toast.error("Verification Error", {
							description:
								context.error?.message ||
								context.error?.statusText ||
								"Failed to verify email",
						})
						setError("token", {
							type: "server",
							message:
								"Failed to verify email. The link may be invalid or expired.",
						})
					},
				}
			)
		} catch (err) {
			setError("token", {
				type: "server",
				message: "Verification failed. Please try again.",
			})
			console.error("Verification error:", err)
		} finally {
			setIsSubmitting(false)
		}
	}

	// Extract token from URL on client side
	useEffect(() => {
		if (typeof window !== "undefined") {
			const urlParams = new URLSearchParams(window.location.search)
			const tokenParam = urlParams.get("token")
			setToken(tokenParam)

			if (tokenParam) {
				setValue("token", tokenParam, { shouldValidate: true })
				handleSubmit(onSubmit)()
			} else {
				setError("token", {
					type: "manual",
					message: "No verification token provided in the URL.",
				})
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setValue, setError, handleSubmit])

	const handleRedirect = () => {
		router.push(isVerified ? "/dashboard" : "/auth/login")
	}

	if (!token && !errors.token) {
		return (
			<div className="text-center">
				<FieldDescription>Loading verification...</FieldDescription>
			</div>
		)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full"
			>
				<FieldGroup className="w-full">
					<div className="flex flex-col items-center gap-2 text-center">
						<Link
							href="/"
							className="flex flex-col items-center gap-2 font-medium"
						>
							<div className="flex items-center justify-center">
								<Logo />
							</div>
							<span className="sr-only">{config.TITLE}</span>
						</Link>
						<h1 className="text-xl font-bold">Verify Your Email</h1>
						<FieldDescription>
							{isSubmitting
								? "Verifying your email..."
								: isVerified
									? "Your email has been verified!"
									: errors.token
										? "Verification failed."
										: "Please wait while we verify your email."}
						</FieldDescription>
					</div>

					<FormField
						control={control}
						name="token"
						render={({ field }) => (
							<FormItem className="hidden">
								<FormControl>
									<Input
										type="hidden"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{errors.token && (
						<div className="text-center">
							<FormDescription className="text-red-500 text-sm">
								{errors.token.message}
							</FormDescription>
						</div>
					)}

					<FieldGroup>
						<Button
							type="button"
							onClick={handleRedirect}
							disabled={isSubmitting}
							className="w-full"
						>
							{isSubmitting
								? "Processing..."
								: isVerified
									? "Go to Dashboard"
									: "Back to Login"}
						</Button>
					</FieldGroup>
				</FieldGroup>
			</form>
		</Form>
	)
}

export default function VerifyEmailPage() {
	return (
		<div className={cn("flex flex-col gap-6 max-w-md mx-auto p-4")}>
			<Suspense
				fallback={
					<div className="text-center">
						<FieldDescription>
							Loading verification...
						</FieldDescription>
					</div>
				}
			>
				<VerifyEmailContent />
			</Suspense>
			<AuthFormFooter />
		</div>
	)
}
