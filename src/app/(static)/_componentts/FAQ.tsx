import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs } from "@/data/faqs" // Adjust the import path if needed

export function FAQ() {
	return (
		<section className="container mx-auto py-12 px-4">
			<div className="text-center lg:text-left mb-10">
				<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
					Frequently Asked Questions
				</h2>
				<p className="mt-4 text-gray-600 md:text-xl">
					Find answers to common questions about our product.
				</p>
			</div>
			<Accordion
				type="single"
				collapsible
				className="w-full mx-auto"
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
		</section>
	)
}
