import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import { BotIcon, DollarSignIcon, MessageCircleIcon, ShoppingCartIcon, WrenchIcon } from "lucide-react"

const features = [
	{
		Icon: DollarSignIcon, // Placeholder for appropriate icon
		name: "Financial Management",
		description:
			"Streamlined levy payments, rent collection, and escrow management.",
		href: "/features/financial",
		cta: "Learn more",
		background: <img className="absolute -top-20 -right-20 opacity-60" />, // Placeholder
		className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
	},
	{
		Icon: MessageCircleIcon, // Placeholder for appropriate icon
		name: "Direct Communication",
		description:
			"Real-time tenant-landlord messaging with end-to-end encryption.",
		href: "/features/communication",
		cta: "Learn more",
		background: <img className="absolute -top-20 -right-20 opacity-60" />, // Placeholder
		className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
	},
	{
		Icon: WrenchIcon, // Placeholder for appropriate icon
		name: "Maintenance Requests",
		description:
			"Submit, track, and resolve maintenance issues with photo documentation.",
		href: "/features/maintenance",
		cta: "Learn more",
		background: <img className="absolute -top-20 -right-20 opacity-60" />, // Placeholder
		className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
	},
	{
		Icon: ShoppingCartIcon, // Placeholder for appropriate icon
		name: "In-Estate Marketplace",
		description:
			"Purchase items from estate-approved vendors with delivery tracking.",
		href: "/features/marketplace",
		cta: "Learn more",
		background: <img className="absolute -top-20 -right-20 opacity-60" />, // Placeholder
		className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
	},
	{
		Icon: BotIcon, // Placeholder for appropriate icon
		name: "AI-Powered Tools",
		description:
			"Automated agreement generation and intelligent escrow management.",
		href: "/features/ai-tools",
		cta: "Learn more",
		background: <img className="absolute -top-20 -right-20 opacity-60" />, // Placeholder
		className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
	},
]

export function FeatureBentoGrid() {
	return (
		<BentoGrid className="lg:grid-rows-3 w-full">
			{features.map((feature) => (
				<BentoCard
					key={feature.name}
					{...feature}
				/>
			))}
		</BentoGrid>
	)
}
