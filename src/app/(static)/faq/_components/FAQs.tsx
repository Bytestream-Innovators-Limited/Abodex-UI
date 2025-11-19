import { faqs } from "@/data/faqs"
import React from "react"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQs() {
	return (
		<div className="order-1 lg:order-2 flex flex-col gap-6 mb-16 lg:mb-0">
			<h2 className="text-2xl lg:text-4xl font-semibold">
				FAQ
			</h2>
			<Accordion
				type="single"
				collapsible
				className="w-full mx-auto p-4 lg:p-8 bg-card rounded-md"
			>
				{faqs.map((faq, idx) => (
					<AccordionItem
						key={idx}
						value={idx.toString()}
					>
						<AccordionTrigger className="text-lg md:text-xl">
							{faq.question}
						</AccordionTrigger>
						<AccordionContent>{faq.answer}</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	)
}
