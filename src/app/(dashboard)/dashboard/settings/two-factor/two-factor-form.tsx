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
import Logo from "@/components/common/Logo"
import AuthFormFooter from "@/app/(authentication)/_component/AuthFormFooter"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import { useCallback, useState, useTransition } from "react"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/authClient"
import { toast } from "sonner"
import QRCode from "react-qr-code"
import { useIsMobile } from "@/hooks/use-mobile"
import { PasswordFormData, passwordSchema } from "@/db/schemas/auth"

type TwoFactorSetupProps = { className?: string }

export function TwoFactorSetup({ className, ...props }: TwoFactorSetupProps) {
	const [isPending, startTransition] = useTransition()
	const [error, setError] = useState<string | null>(null)
	const [isOpen, setIsOpen] = useState(false)
	const [qrCodeUri, setQrCodeUri] = useState<string | null>(null)
	const router = useRouter()
	const isMobile = useIsMobile()
	const { data: session } = authClient.useSession()

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<PasswordFormData>({
		resolver: zodResolver(passwordSchema),
		defaultValues: { password: "" },
		mode: "onTouched",
	})

	// Fetch QR code URI
	const handleFetchQrCode = useCallback(async (data: PasswordFormData) => {
		setError(null)

		startTransition(async () => {
			try {
				const { data: res, error: resError } =
					await authClient.twoFactor.getTotpUri({
						password: data.password,
					})
				if (resError || !res) {
					throw new Error("Failed to fetch QR code")
				}
				setQrCodeUri(res.totpURI)
			} catch (err) {
				setError("Failed to fetch QR code. Please try again.")
				console.error("QR code fetch error:", err)
				toast.error("QR Code Error", {
					description: "Failed to fetch QR code. Please try again.",
				})
			}
		})
	}, [])

	// Enable 2FA
	const handleEnableTwoFactor: SubmitHandler<PasswordFormData> = useCallback(
		async (data) => {
			setError(null)

			startTransition(async () => {
				try {
					await authClient.twoFactor.enable(
						{
							password: data.password,
							issuer: config.TITLE,
						},
						{
							async onSuccess() {
								toast.success("2FA Enabled", {
									description:
										"Two-factor authentication has been enabled successfully!",
								})
								reset()
								setQrCodeUri(null)
								setIsOpen(false)
								router.refresh() // Refresh to update session
							},
							onError(context) {
								toast.error("2FA Enable Error", {
									description:
										context.error.message ||
										context.error.statusText ||
										"Failed to enable 2FA",
								})
								setError(
									"Failed to enable 2FA. Please try again."
								)
							},
						}
					)
				} catch (err) {
					setError("Failed to enable 2FA. Please try again.")
					console.error("2FA enable error:", err)
				}
			})
		},
		[router, reset]
	)

	// Disable 2FA
	const handleDisableTwoFactor = useCallback(async () => {
		setError(null)

		startTransition(async () => {
			try {
				await authClient.twoFactor.disable(
					{
						password: "",
					},
					{
						async onSuccess() {
							toast.success("2FA Disabled", {
								description:
									"Two-factor authentication has been disabled.",
							})
							setIsOpen(false)
							router.refresh() // Refresh to update session
						},
						onError(context) {
							toast.error("2FA Disable Error", {
								description:
									context.error.message ||
									context.error.statusText ||
									"Failed to disable 2FA",
							})
							setError("Failed to disable 2FA. Please try again.")
						},
					}
				)
			} catch (err) {
				setError("Failed to disable 2FA. Please try again.")
				console.error("2FA disable error:", err)
			}
		})
	}, [router])

	// Form submission handler
	const onSubmit: SubmitHandler<PasswordFormData> = useCallback(
		async (data) => {
			if (!qrCodeUri) {
				await handleFetchQrCode(data)
			} else {
				await handleEnableTwoFactor(data)
			}
		},
		[handleFetchQrCode, handleEnableTwoFactor, qrCodeUri]
	)

	// Wrapper for Dialog or Drawer based on device
	const Wrapper = isMobile ? Drawer : Dialog
	const WrapperTrigger = isMobile ? DrawerTrigger : DialogTrigger
	const WrapperContent = isMobile ? DrawerContent : DialogContent
	const WrapperHeader = isMobile ? DrawerHeader : DialogHeader
	const WrapperTitle = isMobile ? DrawerTitle : DialogTitle

	return (
		<Wrapper
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<WrapperTrigger asChild>
				<Button variant="outline">
					{session?.user.twoFactorEnabled
						? "Disable 2FA"
						: "Setup Two-Factor Authentication"}
				</Button>
			</WrapperTrigger>
			<WrapperContent
				className={cn("sm:max-w-md", className)}
				{...props}
			>
				<WrapperHeader>
					<WrapperTitle>Two-Factor Authentication</WrapperTitle>
				</WrapperHeader>
				<form
					className="w-full"
					onSubmit={handleSubmit(onSubmit)}
				>
					<FieldGroup className="w-full">
						<div className="flex flex-col items-center gap-2 text-center">
							<div className="flex items-center justify-center rounded-md">
								<Logo />
							</div>
							<span className="sr-only">{config.TITLE}</span>
							<h1 className="text-xl font-bold">
								{session?.user.twoFactorEnabled
									? "Disable Two-Factor Authentication"
									: "Setup Two-Factor Authentication"}
							</h1>
							<FieldDescription>
								{session?.user.twoFactorEnabled
									? "Enter your password to disable 2FA."
									: qrCodeUri
										? "Scan the QR code with your authenticator app and enter your password to enable 2FA."
										: "Enter your password to generate a QR code for your authenticator app."}
							</FieldDescription>
						</div>

						{qrCodeUri && !session?.user.twoFactorEnabled && (
							<Field className="flex justify-center">
								<QRCode
									value={qrCodeUri}
									size={200}
									className="mx-auto"
								/>
							</Field>
						)}

						<Field>
							<FieldLabel htmlFor="password">Password</FieldLabel>
							<Controller
								control={control}
								name="password"
								render={({ field }) => (
									<Input
										id="password"
										type="password"
										placeholder="Enter your password"
										value={field.value}
										onChange={field.onChange}
										disabled={isPending}
									/>
								)}
							/>
							{errors.password && (
								<p className="text-red-500 text-sm mt-2">
									{errors.password.message}
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
									: qrCodeUri &&
										  !session?.user.twoFactorEnabled
										? "Enable 2FA"
										: "Generate QR Code"}
							</Button>
						</Field>

						{session?.user.twoFactorEnabled && (
							<Field>
								<Button
									type="button"
									variant="destructive"
									onClick={handleDisableTwoFactor}
									disabled={isPending}
								>
									{isPending
										? "Processing..."
										: "Disable 2FA"}
								</Button>
							</Field>
						)}

						{error && (
							<p className="text-red-500 text-sm text-center">
								{error}
							</p>
						)}
					</FieldGroup>
				</form>
				<AuthFormFooter />
			</WrapperContent>
		</Wrapper>
	)
}
