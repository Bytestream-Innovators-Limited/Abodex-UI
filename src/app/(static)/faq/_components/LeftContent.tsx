/* eslint-disable react/no-unescaped-entities */
"use client"

import { ResponsiveModal } from "@/components/common/ResponsiveModal"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import React from "react"
import { QuestionForm } from "./FAQForm"

export default function LeftContent() {
	const [isModalOpen, setIsModalOpen] = React.useState(false)

	return (
		<div className="order-2 lg:order-1 w-full flex flex-col relative justify-between">
			<div className="flex flex-col gap-4">
				<h1 className="text-2xl lg:text-5xl font-semibold mb-8">
					We&apos;ve got answers
				</h1>
				<p className="mb-16">
					Can't find what you're looking for? Our team is here to
					help! Whether you need clarification, have a specific
					question, or want to learn more about our services, we'd
					love to hear from you. Let's get you the answers you need.
				</p>
			<Button
				onClick={() => setIsModalOpen(true)}
				className="text-white w-fit"
			>
				<MessageCircle className="mr-2 h-4 w-4" />
				Ask a Question
			</Button>
			</div>

			<ResponsiveModal
				open={isModalOpen}
				onOpenChange={setIsModalOpen}
				title="Ask a Question"
				description="Can't find what you're looking for? Ask us anything."
				size="lg"
			>
				<QuestionForm onClose={() => setIsModalOpen(false)} />
			</ResponsiveModal>
		</div>
	)
}
