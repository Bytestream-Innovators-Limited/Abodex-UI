/* eslint-disable react/no-unescaped-entities */
// components/contact-form.tsx
"use client"

import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ContactFormData, contactSchema } from "../_zod/contact"
import { sendContactEmail } from "@/actions/contact"
import Editor from "@/components/common/Editor"

export function ContactForm() {
	const [isPending, startTransition] = useTransition()

	// 1. Define your form with react-hook-form
	const form = useForm<ContactFormData>({
		resolver: zodResolver(contactSchema),
		defaultValues: {
			name: "",
			email: "",
			message: "",
			howYouFoundUs: undefined,
			subscribeToNewsletter: false,
		},
	})

	// 2. Define a submit handler.
	function onSubmit(values: ContactFormData) {
		startTransition(async () => {
			const { success } = await sendContactEmail(values)
			if (success) {
				// You can show a success toast here
				form.reset()
			}
		})
	}

	return (
		<div className="order-1 lg:order-2 flex items-center justify-center w-full">
			<Card className="w-full lg:max-w-2xl shadow-lg">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl">Get in Touch</CardTitle>
					<CardDescription>
						Send us a message and we'll get back to you as soon as
						possible.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-6"
						>
							{/* First Row: Name and Email */}
							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem className="h-full">
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input
													placeholder="Your name"
													{...field}
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem className="h-full">
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													type="email"
													placeholder="Your email address"
													{...field}
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							{/* Message Field */}
							<FormField
								control={form.control}
								name="message"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Message</FormLabel>
										<FormControl>
											<Editor
												placeholder="Your message..."
												field={field}
												key={"contact-form"}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Second Row: How you found us and Newsletter */}
							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								<FormField
									control={form.control}
									name="howYouFoundUs"
									render={({ field }) => (
										<FormItem className="h-full">
											<FormLabel>
												How did you hear about us? 👋
											</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
												disabled={isPending}
											>
												<FormControl>
													<SelectTrigger className="w-full">
														<SelectValue placeholder="Select an option" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="search_engine">
														Search Engine (Google,
														Bing, etc.)
													</SelectItem>
													<SelectItem value="social_media">
														Social Media (Twitter,
														LinkedIn, etc.)
													</SelectItem>
													<SelectItem value="friend_or_colleague">
														Friend or Colleague
													</SelectItem>
													<SelectItem value="advertisement">
														Advertisement
													</SelectItem>
													<SelectItem value="other">
														Other
													</SelectItem>
												</SelectContent>
											</Select>
											<FormDescription>
												Help us understand where our
												users come from.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="subscribeToNewsletter"
									render={({ field }) => (
										<FormItem className="h-full flex items-center space-x-3 rounded-md border p-4">
											<FormControl>
												<Checkbox
													checked={field.value}
													onCheckedChange={
														field.onChange
													}
													disabled={isPending}
												/>
											</FormControl>
											<div className="space-y-1 leading-none">
												<FormLabel className="font-medium">
													Subscribe to our weekly
													newsletter
												</FormLabel>
												<FormDescription>
													Receive updates and special
													offers.
												</FormDescription>
											</div>
										</FormItem>
									)}
								/>
							</div>

							{/* Submit Button */}
							<Button
								type="submit"
								className="w-full"
								disabled={isPending}
							>
								{isPending ? "Submitting..." : "Send Message"}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	)
}
