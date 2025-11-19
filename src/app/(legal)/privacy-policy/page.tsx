// app/privacy/page.tsx

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { gdprSections } from "@/data/gdpr"

export const metadata = {
	title: "Privacy & GDPR Policy",
	description:
		"Abodex's Privacy Policy outlines how we collect, use, and protect your information in accordance with GDPR.",
}

export default function PrivacyPolicyPage() {
	return (
		<section className="container py-16 lg:py-20">
			<div className="mx-auto max-w-4xl">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
						Privacy & GDPR Policy
					</h1>
					<p className="mt-4 text-muted-foreground md:text-xl">
						Your privacy is critically important to us.
					</p>
				</div>

				<div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 md:p-8">
					<p className="text-sm text-muted-foreground mb-6">
						<strong>Effective Date:</strong> Nov 18, 2025 |{" "}
						<strong>Last Updated:</strong> Nov 18, 2025
					</p>

					{/* 
			- type="single" ensures only one item can be open at a time.
			- collapsible allows the open item to be closed again.
			- defaultValue="introduction" opens the first section by default.
		  */}
					<Accordion
						type="single"
						collapsible
						defaultValue="introduction"
						className="w-full"
					>
						{gdprSections.map((section) => (
							<AccordionItem
								key={section.id}
								value={section.id}
							>
								<AccordionTrigger className="text-left">
									{section.title}
								</AccordionTrigger>
								<AccordionContent className="prose prose-sm max-w-none dark:prose-invert">
									{section.content}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>

				<div className="mt-8 text-center text-sm text-muted-foreground">
					<p>
						This document is a template and should be reviewed by a
						legal professional to ensure compliance with all
						applicable laws and regulations.
					</p>
				</div>
			</div>
		</section>
	)
}
