import { ArrowDownRight, Star } from "lucide-react"
import Image from "next/image"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Grid from "./Abstracts/Grid"

interface Hero3Props {
	heading?: string
	description?: string
	buttons?: {
		primary?: {
			text: string
			url: string
		}
		secondary?: {
			text: string
			url: string
		}
	}
	reviews?: {
		count: number
		avatars: {
			src: string
			alt: string
		}[]
		rating?: number
	}
}

const Hero = ({
	heading = "Simplify Estate Finance. Maximize Your Returns.",
	description = "Abodex is the all-in-one estate finance management solution. Automate rent collection, effortlessly track expenses, and generate insightful financial reports. Gain complete control over your property portfolio's financial health and make data-driven decisions to maximize your profitability.",
	buttons = {
		primary: {
			text: "Start Free Trial",
			url: "/auth/signup",
		},
		secondary: {
			text: "View a Demo",
			url: "#demo",
		},
	},
	reviews = {
		count: 500,
		rating: 4.9,
		avatars: [
			{
				src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
				alt: "Avatar 1",
			},
			{
				src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
				alt: "Avatar 2",
			},
			{
				src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
				alt: "Avatar 3",
			},
			{
				src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
				alt: "Avatar 4",
			},
			{
				src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
				alt: "Avatar 5",
			},
		],
	},
}: Hero3Props) => {
	return (
		<section className="container mx-auto relative flex min-h-[calc(100vh-84px)] items-center justify-center">
			{/* Main content container */}
			<div className="relative z-20 mx-auto grid items-center gap-10 px-4 lg:grid-cols-2 lg:gap-20 lg:px-8">
				{/* Background Grid - Now centered relative to the content */}
				<div className="absolute inset-0 -z-10 flex items-center justify-center opacity-50 text-foreground">
					<Grid />
				</div>

				{/* Left Column Content */}
				<div className="flex flex-col items-center text-center lg:items-start lg:text-left">
					<h1 className="my-6 text-pretty text-2xl md:text-4xl font-bold lg:text-6xl xl:text-7xl">
						{heading}
					</h1>
					<p className="mb-8 max-w-xl text-sm text-muted-foreground lg:text-xl">
						{description}
					</p>
					<div className="mb-12 flex w-fit flex-col items-center gap-4 sm:flex-row lg:items-start">
						<span className="inline-flex items-center -space-x-4">
							{reviews.avatars.map((avatar, index) => (
								<Avatar
									key={index}
									className="size-12 border-2 background"
								>
									<AvatarImage
										src={avatar.src}
										alt={avatar.alt}
									/>
								</Avatar>
							))}
						</span>
						<div>
							<div className="flex items-center gap-1">
								{[...Array(5)].map((_, index) => (
									<Star
										key={index}
										className="size-5 fill-yellow-400 text-yellow-400"
									/>
								))}
								<span className="mr-1 font-semibold">
									{reviews.rating?.toFixed(1)}
								</span>
							</div>
							<p className="font-medium text-muted-foreground text-left text-sm">
								from {reviews.count}+ reviews
							</p>
						</div>
					</div>
					<div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
						{buttons.primary && (
							<Button
								asChild
								className="w-full sm:w-auto"
							>
								<a href={buttons.primary.url}>
									{buttons.primary.text}
								</a>
							</Button>
						)}
						{buttons.secondary && (
							<Button
								asChild
								variant="outline"
							>
								<a href={buttons.secondary.url}>
									{buttons.secondary.text}
									<ArrowDownRight className="size-4" />
								</a>
							</Button>
						)}
					</div>
				</div>

				{/* Right Column - Hero Image */}
				<div className="flex justify-center lg:justify-end">
					<div className="relative aspect-4/3 w-full max-w-lg overflow-hidden rounded-xl shadow-2xl lg:aspect-3/4 lg:max-w-sm">
						<Image
							fill
							src="/hero/home1.jpg"
							alt="A financial dashboard on a tablet showing property income and expenses."
							style={{ objectFit: "cover" }}
						/>
					</div>
				</div>
			</div>
		</section>
	)
}

export { Hero }
