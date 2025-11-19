/* eslint-disable react/no-unescaped-entities */
import { IconStars } from "@tabler/icons-react"
import Image from "next/image"
import React from "react"

export default function RightComponent() {
	return (
		<div className="flex flex-col gap-4 h-full">
			<div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-rows-3 gap-4">
				<div className="bg-card h-full lg:row-span-2 rounded-md overflow-hidden">
					<Image
						src={"/hero/office.png"}
						alt="our building"
						className="object-cover h-full w-full"
						height={460}
						width={460}
					/>
				</div>
				<div className="bg-card h-full lg:row-span-3 flex flex-col justify-between gap-8 p-4 rounded-md">
					<div className="flex items-center space-x-3 mb-4">
						<IconStars className="h-8 w-8 text-primary" />
						<h3 className="text-xl font-semibold">Our Values</h3>
					</div>
					<Image
						src={"/hero/happy-landlord.png"}
						alt="our building"
						className="object-cover h-full w-full rounded-md"
						height={460}
						width={460}
					/>
					<p className="text-md font-semibold mb-8 text-muted-foreground">
						Our values are rooted in our deep understanding of
						african estate communities. They shape our culture,
						guide our decisions, and define how we serve thousands
						of residents across the country.
					</p>
				</div>
				<div className="bg-card h-48 rounded-md overflow-hidden">
					<Image
						src={"/hero/estate.jpg"}
						alt="our building"
						className="object-cover h-full w-full"
						height={460}
						width={460}
					/>
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<h1 className="text-2xl lg:text-5xl font-semibold mb-8">
					Our Workplace
				</h1>
				<h2 className="text-md lg:text-2xl font-semibold mb-8 text-muted-foreground">
					The workplace dynamics at Abodex are defined by a core
					commitment to precision, proactivity, and mutual respect.
				</h2>
				<p className="">
					Given our specialization in complex estate finance
					management and property solutions, we cultivate a highly
					collaborative and results-oriented environment. Our teams,
					spanning financial analysis, real estate operations, and
					client relations, are structured to work cross-functionally,
					ensuring that every property asset and financial transaction
					is handled with comprehensive insight and seamless
					execution.
				</p>
				<p className="">
					Innovation is central to our daily work; we encourage the
					continuous adoption of proptech tools and ethical financial
					modeling to provide the best value for our clients. While
					the nature of estate finance demands focus and high
					standards, we balance these demands with a culture that
					supports continuous professional development and work-life
					integration. Success at Abodex is measured not just by
					portfolio performance, but by the strength of our team, the
					quality of our relationships, and our shared commitment to
					building long-term trust in the property and finance
					sectors.
				</p>
			</div>
		</div>
	)
}
