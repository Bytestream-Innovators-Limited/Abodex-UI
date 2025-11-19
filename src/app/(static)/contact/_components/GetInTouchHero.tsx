// components/contact/get-in-touch-hero.tsx
import { CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export function GetInTouchHero() {
	const services = [
		{
			title: "Share Your Estate goals & requirements",
			description:
				"Tell us about your vision and what you hope to achieve.",
		},
		{
			title: "Receive a custom proposal",
			description:
				"Get a tailored solution designed specifically for your needs.",
		},
		{
			title: "Schedule a strategy consultation",
			description: "Meet with our experts to plan your next steps.",
		},
	]

	return (
		<div className="mb-8 lg:mb-16">
			<h1 className="text-2xl lg:text-5xl font-semibold mb-8">
				Get in touch
			</h1>

			<div className="flex flex-col gap-6 mt-12">
				{services.map((service, index) => (
					<div
						key={index}
						className="border-none"
					>
						<CardContent className="flex items-center gap-4">
							<div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center mb-4">
								<CheckCircle className="h-4 w-4 text-primary" />
							</div>
							<div className="flex flex-col gap-0">
								<h3 className="text-md font-semibold">
									{service.title}
								</h3>
								<p className="text-muted-foreground text-sm">
									{service.description}
								</p>
							</div>
						</CardContent>
					</div>
				))}
			</div>
		</div>
	)
}
