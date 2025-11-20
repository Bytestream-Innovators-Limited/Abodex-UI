/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState, useTransition } from "react"
import { authClient } from "@/lib/authClient"
import { PasswordFormData, passwordSchema } from "@/db/schemas/auth"
import { toast } from "sonner"
import { Switch } from "@/components/ui/switch"
import useSWR from "swr"
import { Skeleton } from "@/components/ui/skeleton"
import { ResponsiveModal } from "@/components/common/ResponsiveModal"
import { useRouter } from "next/navigation"
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp"
import QRCode from "react-qr-code"
import { config } from "@/config"
import { Separator } from "@/components/ui/separator"
import { viewBackupCodes } from "@/actions/auth"
import {
	AddPasskeyDTO,
	ChangePasswordDTO,
	TwoFactorCodeDTO,
	addpasskeySchema,
	changePasswordSchema,
	twoFactorCodeSchema,
} from "../_zod/validation"

export default function SettingsPage() {
	const { data: session } = authClient.useSession()
	const [isLoading, startTransition] = useTransition()
	const [passkeyOpen, setPasskeyOpen] = useState(false)
	const [twoFactorOpen, setTwoFactorOpen] = useState(false)
	const [backupCodeOpen, setBackupCodeOpen] = useState(false)
	const [qrUrl, setQrUrl] = useState<string | null>(null)
	const [backupCodes, setBackupCodes] = useState<string[]>([])

	const router = useRouter()
	const {
		data,
		error: passkeyError,
		isLoading: passkeyLoading,
	} = useSWR("user-passkeys", () => authClient.passkey.listUserPasskeys())

	const removePasskey = async (id: string) => {
		startTransition(async () => {
			try {
				const { data, error } = await authClient.passkey.deletePasskey({
					id: id, // required
				})
				if (error && data === null) {
					toast.error(error.status, {
						description: error.statusText,
					})
				} else {
					toast.success("Passkey Removed")
				}
			} catch (error: any) {
				toast.error("Error Removing Passkey", {
					description:
						error.message ||
						"There was an error removing a passkey",
				})
			} finally {
				router.refresh()
			}
		})
	}

	// passkey
	const passkeyForm = useForm<AddPasskeyDTO>({
		resolver: zodResolver(addpasskeySchema),
	})
	const submitPasskey = async (data: AddPasskeyDTO) => {
		startTransition(async () => {
			try {
				await authClient.passkey.addPasskey(
					{
						name: data.name,
						authenticatorAttachment: "cross-platform",
					},
					{
						onSuccess() {
							toast.success("Passkey Added", {
								description:
									"you successfully added a new passkey for added security",
							})
							passkeyForm.reset()
							router.refresh()
						},
						onError(context) {
							toast.error("Passkey Error", {
								description: context.error.message,
							})
						},
					}
				)
			} catch (error: any) {
				const msg =
					error.message || "There was an error adding your passkey"
				toast.error("Passkey Error", {
					description: msg,
				})
				passkeyForm.reset()
				router.refresh()
			} finally {
				passkeyForm.reset()
				setPasskeyOpen(false)
				router.refresh()
			}
		})
	}

	// Password
	const passwordForm = useForm<ChangePasswordDTO>({
		resolver: zodResolver(changePasswordSchema),
		defaultValues: {
			revokeOtherSessions: false,
		},
	})
	const submitPassword = async (data: ChangePasswordDTO) => {
		startTransition(async () => {
			try {
				await authClient.changePassword(
					{
						newPassword: data.newPassword, // required
						currentPassword: data.currentPassword, // required
						revokeOtherSessions: data.revokeOtherSessions,
					},
					{
						onSuccess: () => {
							toast.success("Password Changed", {
								description:
									"You successfully changed your password.",
							})
							passwordForm.reset({
								currentPassword: "",
								newPassword: "",
								revokeOtherSessions: false,
							})
							router.refresh()
						},
					}
				)
			} catch (error: any) {
				const msg =
					error.message || "There was an error changing your password"
				toast.error("Password Change Failed", {
					description: msg,
				})
			} finally {
				passwordForm.reset({
					currentPassword: "",
					newPassword: "",
					revokeOtherSessions: false,
				})
				router.refresh()
			}
		})
	}

	// 2fa
	const twoFaPasswordForm = useForm<PasswordFormData>({
		resolver: zodResolver(passwordSchema),
	})
	const submitTwoFaPassword = async (data: PasswordFormData) => {
		startTransition(async () => {
			try {
				await authClient.twoFactor.enable(
					{
						password: data.password,
						issuer: config.TITLE,
					},
					{
						onSuccess(ctx) {
							setQrUrl(ctx.data.totpURI)
							setBackupCodes(ctx.data.backupCodes)
						},
					}
				)
			} catch (error: any) {
				const msg =
					error.message || "There was an error adding 2fa record"
				toast.error("Two Factor Error", {
					description: msg,
				})
			} finally {
				twoFaPasswordForm.reset()
				// setTwoFactorOpen(false)
				router.refresh()
			}
		})
	}

	const disableTwoFactor = async (data: PasswordFormData) => {
		startTransition(async () => {
			try {
				const disableRes = await authClient.twoFactor.disable({
					password: data.password,
				})
				passwordForm.reset()
				if (disableRes.error) {
					toast.error("Error Disabling 2FA", {
						description: disableRes.error.message,
					})
				} else {
					toast.success("Two-Factor Authentication Disabled", {
						description:
							"Your account no longer requires 2FA for login.",
					})
				}
				router.refresh()
			} catch (error: any) {
				const msg = error.message || "There was an error disabling 2FA"
				toast.error("Disable Error", {
					description: msg,
				})
			} finally {
				passwordForm.reset()
				setTwoFactorOpen(false)
				router.refresh()
			}
		})
	}

	const twoFactorCodeForm = useForm<TwoFactorCodeDTO>({
		resolver: zodResolver(twoFactorCodeSchema),
	})
	const submitTwoFactorCode = async (data: TwoFactorCodeDTO) => {
		startTransition(async () => {
			try {
				await authClient.twoFactor.verifyTotp(
					{
						code: data.code, // required
						trustDevice: true,
					},
					{
						onSuccess() {
							toast.success("Two Factor Verified", {
								description:
									"Successfully activated two factor authentication",
							})
							twoFactorCodeForm.reset()
							setTwoFactorOpen(false)
							router.refresh()
						},
						onError(ctx) {
							toast.error("TOTP Code Error", {
								description: ctx.error.message,
							})
						},
					}
				)
			} catch (error: any) {
				const msg = error.message || "There was an error adding code"
				toast.error("Two Factor Error", {
					description: msg,
				})
			} finally {
				twoFactorCodeForm.reset()
				setTwoFactorOpen(false)
				router.refresh()
			}
		})
	}

	const fetchBackupCodes = async () => {
		startTransition(async () => {
			try {
				const res = await viewBackupCodes({ userId: session!.user.id })
				if (res.status && res.data) {
					setBackupCodes(res.data)
				}
			} catch (error: any) {
				const msg =
					error.message || "There was an error viewing backup codes"
				toast.error("Backup Code", {
					description: msg,
				})
			}
		})
	}

	return (
		<div className="container mx-auto">
			<h1 className="text-3xl font-bold mb-6">Account Settings</h1>
			<Tabs
				defaultValue="two-factor"
				className="w-full  mx-auto"
			>
				<TabsList className="w-full pl-12 md:pl-1 overflow-x-auto flex flex-row items-center gap-1">
					<TabsTrigger
						className="cursor-pointer shrink-0 w-fit"
						value="two-factor"
					>
						Two-Factor Auth
					</TabsTrigger>
					<TabsTrigger
						className="cursor-pointer shrink-0 w-fit"
						value="passkey"
					>
						Passkey Setup
					</TabsTrigger>
					<TabsTrigger
						className="cursor-pointer shrink-0 w-fit"
						value="password"
					>
						Change Password
					</TabsTrigger>
				</TabsList>
				{/* Two-Factor Authentication Tab */}
				<TabsContent value="two-factor">
					<Card>
						<CardHeader>
							<CardTitle>
								Two-Factor Authentication (2FA)
							</CardTitle>
							<CardDescription className="text-gray-400">
								Add an extra layer of security to your account
								using 2FA.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							{/* This is where your 2FA setup UI would go */}
							<p>
								2FA is currently{" "}
								{session?.user.twoFactorEnabled ? (
									<span className="font-semibold text-green-400">
										Enabled
									</span>
								) : (
									<span className="font-semibold text-red-400">
										disabled
									</span>
								)}
								.
							</p>

							{!session?.user.twoFactorEnabled ? (
								<ResponsiveModal
									onOpenChange={setTwoFactorOpen}
									open={twoFactorOpen}
									key={"twoFactor"}
									title="Add Two Factor Authentication"
									description="When 2FA is enabled, you will be required to
                                enter a code from your authenticator app each
                                time you log in."
									trigger={
										<Button className="">
											Enable 2FA
										</Button>
									}
								>
									{!qrUrl ? (
										<Form {...twoFaPasswordForm}>
											<form
												onSubmit={twoFaPasswordForm.handleSubmit(
													submitTwoFaPassword
												)}
												className="flex flex-col gap-4"
											>
												<FormField
													control={
														twoFaPasswordForm.control
													}
													name="password"
													render={({ field }) => (
														<FormItem>
															<FormLabel>
																Authorize Two
																Factor
															</FormLabel>
															<FormControl>
																<Input
																	type="password"
																	autoComplete="current-password webauthn"
																	placeholder="***"
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<Button
													disabled={isLoading}
													type="submit"
												>
													{isLoading
														? "Enabling..."
														: "Enable Two Factor"}
												</Button>
											</form>
										</Form>
									) : (
										<div>
											<QRCode
												value={qrUrl}
												className="mx-auto"
											/>
											<p className="my-4 text-center text-sm">
												Scan this QR code with your
												authenticator app and input the
												code into the field below.
											</p>
											<Separator />
											<Form {...twoFactorCodeForm}>
												<form
													onSubmit={twoFactorCodeForm.handleSubmit(
														submitTwoFactorCode
													)}
													className="py-4 mb-4 mx-auto flex flex-col gap-4 items-center"
												>
													<FormField
														control={
															twoFactorCodeForm.control
														}
														name="code"
														render={({ field }) => (
															<FormItem>
																<FormControl>
																	<InputOTP
																		{...field}
																		maxLength={
																			6
																		}
																	>
																		<InputOTPGroup>
																			<InputOTPSlot
																				index={
																					0
																				}
																			/>
																			<InputOTPSlot
																				index={
																					1
																				}
																			/>
																			<InputOTPSlot
																				index={
																					2
																				}
																			/>
																		</InputOTPGroup>
																		<InputOTPSeparator />
																		<InputOTPGroup>
																			<InputOTPSlot
																				index={
																					3
																				}
																			/>
																			<InputOTPSlot
																				index={
																					4
																				}
																			/>
																			<InputOTPSlot
																				index={
																					5
																				}
																			/>
																		</InputOTPGroup>
																	</InputOTP>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<Button
														disabled={isLoading}
														type="submit"
														className="w-full"
													>
														{isLoading
															? "Enabling..."
															: "Confirm"}
													</Button>
												</form>
											</Form>
										</div>
									)}
								</ResponsiveModal>
							) : (
								<div className="flex items-center gap-4">
									<ResponsiveModal
										onOpenChange={setTwoFactorOpen}
										open={twoFactorOpen}
										key={"disable-twoFactor"}
										formResolver={twoFaPasswordForm}
										title="Disable Two Factor Authentication"
										description="Disabling your two factor authentication is not advisable, however if you are certain go ahead."
										trigger={
											<Button
												type="button"
												variant={"destructive"}
											>
												Disable Two Factor
											</Button>
										}
									>
										<Form {...twoFaPasswordForm}>
											<form
												onSubmit={twoFaPasswordForm.handleSubmit(
													disableTwoFactor
												)}
											>
												<FormField
													control={
														twoFaPasswordForm.control
													}
													name="password"
													render={({ field }) => (
														<FormItem>
															<FormLabel>
																Authorize Two
																Factor
															</FormLabel>
															<FormControl>
																<Input
																	type="password"
																	autoComplete="current-password webauthn"
																	placeholder="***"
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<Button
													disabled={isLoading}
													type="submit"
												>
													{isLoading
														? "Disabling..."
														: "Disable Two Factor"}
												</Button>
											</form>
										</Form>
									</ResponsiveModal>

									<ResponsiveModal
										key={"fetchBackupCode"}
										onOpenChange={setBackupCodeOpen}
										open={backupCodeOpen}
										title="Backup Codes"
										description="Save these codes securely to prevent being locked out of your account"
										trigger={
											<Button
												onClick={fetchBackupCodes}
												type="button"
												variant="outline"
												disabled={isLoading}
											>
												{isLoading
													? "Fetching..."
													: "View Backup Codes"}
											</Button>
										}
									>
										<div className="grid grid-cols-2 gap-2">
											{backupCodes.map((code, i) => (
												<span
													key={i}
													className="flex border p-2 font-bold text-center"
												>
													{code}
												</span>
											))}
										</div>
									</ResponsiveModal>
								</div>
							)}
						</CardContent>
					</Card>
				</TabsContent>

				{/* Passkey Setup Tab */}
				<TabsContent value="passkey">
					<Card>
						<CardHeader>
							<CardTitle>Passkey Setup</CardTitle>
							<CardDescription className="text-gray-400">
								Manage your passkeys for passwordless and secure
								login.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							{/* This is where your Passkey management UI would go */}
							<p className="text-sm text-gray-500">
								Passkeys allow you to log in without a password
								using your device&apos;s biometric security
								(fingerprint, face ID, etc.).
							</p>
							<ResponsiveModal
								trigger={
									<Button className="">
										Add New Passkey
									</Button>
								}
								open={passkeyOpen}
								description="Add an extra security method to ensure no bridge for your account."
								onOpenChange={setPasskeyOpen}
								title="Add New Passkey"
								key={"passkey"}
							>
								<Form {...passkeyForm}>
									<form
										onSubmit={passkeyForm.handleSubmit(
											submitPasskey
										)}
										className="flex flex-col gap-4"
									>
										<FormField
											control={passkeyForm.control}
											name="name"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Passkey Name
													</FormLabel>
													<FormControl>
														<Input
															type="text"
															autoCapitalize="words"
															placeholder="Enter new passkey name"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<Button
											disabled={isLoading}
											type="submit"
										>
											{isLoading
												? "Creating..."
												: "Create Passkey"}
										</Button>
									</form>
								</Form>
							</ResponsiveModal>
							{/* List passkeys */}
							{passkeyLoading ? (
								<Skeleton className="w-full h-44" />
							) : passkeyError ? (
								<div className="text-red-500 text-sm">
									Error loading passkeys
								</div>
							) : (
								data?.data?.map((passkey) => (
									<div
										key={passkey.id}
										className="space-y-2 mt-4"
									>
										<div className="flex justify-between items-center border-2 border-gray-700 p-3">
											<div className="flex flex-col gap-2">
												<span className="flex w-fit">
													{passkey.name ||
														passkey.publicKey}
												</span>
												<span className="text-xs">
													{passkey.deviceType}
												</span>
											</div>
											<Button
												type="button"
												onClick={() =>
													removePasskey(passkey.id)
												}
												variant="destructive"
												size="sm"
												disabled={isLoading} // Add loading state to remove button too
											>
												Remove
											</Button>
										</div>
									</div>
								))
							)}
						</CardContent>
					</Card>
				</TabsContent>

				{/* Password Change Tab */}
				<TabsContent value="password">
					<Card>
						<CardHeader>
							<CardTitle>Change Password</CardTitle>
							<CardDescription className="text-gray-400">
								Update your account password.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							{/* This is where your password change form would go */}
							<Form {...passwordForm}>
								<form
									onSubmit={passwordForm.handleSubmit(
										submitPassword
									)}
									className="flex flex-col gap-4"
								>
									<FormField
										control={passwordForm.control}
										name="currentPassword"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Current Password
												</FormLabel>
												<FormControl>
													<Input
														disabled={isLoading}
														type="password"
														placeholder="Enter your current password"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={passwordForm.control}
										name="newPassword"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													New Password
												</FormLabel>
												<FormControl>
													<Input
														disabled={isLoading}
														type="password"
														placeholder="Enter your new password"
														{...field}
													/>
												</FormControl>
											</FormItem>
										)}
									/>
									<FormField
										control={passwordForm.control}
										name="revokeOtherSessions"
										render={({ field }) => (
											<FormItem className="flex flex-row items-center justify-between border p-4 rounded-md">
												{" "}
												{/* Added border and padding for better styling */}
												<div className="space-y-0.5">
													<FormLabel>
														Revoke all other
														sessions
													</FormLabel>
													<FormDescription className="text-gray-500">
														Log out from all other
														devices and browsers
														where you are currently
														signed in. This will
														require you to log in
														again on those devices.
													</FormDescription>
												</div>
												<FormControl>
													<Switch
														checked={field.value}
														onCheckedChange={
															field.onChange
														}
														disabled={isLoading}
													/>
												</FormControl>
											</FormItem>
										)}
									/>
									<Button
										variant={"default"}
										type="submit"
										disabled={isLoading}
										className="lg:max-w-sm ml-auto"
									>
										Change Password
									</Button>
								</form>
							</Form>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}
