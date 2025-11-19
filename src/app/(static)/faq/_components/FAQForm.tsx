/* eslint-disable react/no-unescaped-entities */
"use client"

import React from "react"
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
import Editor from "@/components/common/Editor"
import { toast } from "sonner"
import { formSchema, FormValues } from "../_zod/faq"

interface QuestionFormProps {
	onClose: () => void
}

export function QuestionForm({ onClose }: QuestionFormProps) {
	const [isSubmitting, setIsSubmitting] = React.useState(false)

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			question: "",
		},
	})

	async function onSubmit(values: FormValues) {
		setIsSubmitting(true)

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000))

			// Here you would normally send the data to your API
			console.log(values)

			// Show success toast
			toast.success("Your question has been submitted successfully!")

			// Reset form and close modal
			form.reset()
			onClose()
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error: unknown) {
			// Show error toast
			toast.error("Something went wrong. Please try again.")
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6"
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder="your@email.com"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								We'll use this to respond to your question.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="question"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Question</FormLabel>
							<FormControl>
								<Editor
									placeholder="What would you like to know?"
									field={field}
								/>
							</FormControl>
							<FormDescription>
								Be as detailed as possible so we can provide the
								best answer.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex justify-end space-x-2 pt-4">
					<Button
						type="button"
						variant="outline"
						onClick={onClose}
						disabled={isSubmitting}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Submitting..." : "Submit"}
					</Button>
				</div>
			</form>
		</Form>
	)
}
