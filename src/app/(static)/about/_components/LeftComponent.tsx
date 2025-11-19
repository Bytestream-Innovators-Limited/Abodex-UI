/* eslint-disable react/no-unescaped-entities */
import { Card, CardContent } from "@/components/ui/card"
import { HomeIcon, ShieldIcon } from "lucide-react"
import React from "react"
import Image from "next/image"

export default function LeftComponent() {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-4">
				<h1 className="text-2xl lg:text-5xl font-semibold mb-8">
					Our Story
				</h1>
				<h2 className="text-md lg:text-2xl font-semibold mb-8 text-muted-foreground">
					Redefining Estate Living for the Modern World
				</h2>
				<div className="gap-1">
					<p className="mb-4">
						Abodex emerged from a simple observation: Nigerian
						estates deserved better. In 2020, our founders
						experienced firsthand the daily frustrations that
						plagued gated communities across Nigeria - from
						inefficient levy collections to poor communication
						channels and maintenance nightmares.Abodex emerged from
						a simple observation: Nigerian estates deserved better.
						In 2020, our founders experienced firsthand the daily
						frustrations that plagued gated communities across
						Nigeria - from inefficient levy collections to poor
						communication channels and maintenance nightmares.
					</p>
					<p className="mb-4">
						What began as a solution to address these pain points
						has evolved into Nigeria's leading estate management
						platform. We've transformed how over 500 communities
						operate, bringing transparency, efficiency, and modern
						technology to traditional estate management.
					</p>
					<p className="mb-4">
						Today, Abodex stands as a testament to Nigerian
						innovation, proving that homegrown solutions can solve
						local challenges with world-class technology. We're not
						just managing estates; we're building communities where
						residents can truly enjoy the luxury living they
						deserve.
					</p>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-rows-3 gap-4">
				<Card className="lg:row-span-3">
					<CardContent className="p-6 h-full justify-between flex flex-col">
						<div className="flex items-center space-x-3 mb-4">
							<HomeIcon className="h-8 w-8 text-primary" />
							<h3 className="text-xl font-semibold">
								Our Mission
							</h3>
						</div>
						<p className="text-muted-foreground">
							To revolutionize estate management across Africa
							through innovative technology that creates seamless,
							secure, and enjoyable living experiences for
							residents while simplifying operations for estate
							administrators.
						</p>
					</CardContent>
				</Card>
				<div className="bg-card h-48 rounded-md">
					<Image
						src="/hero/team.png"
						alt="Our Team"
						width={400}
						height={300}
						className="object-cover rounded-md h-full w-full"
					/>
				</div>
				<Card className="h-full lg:row-span-2">
					<CardContent className="p-6 h-full justify-between flex flex-col">
						<div className="flex items-center space-x-3 mb-4">
							<ShieldIcon className="h-8 w-8 text-primary" />
							<h3 className="text-xl font-semibold">
								Our Vision
							</h3>
						</div>
						<p className="text-muted-foreground">
							To become the cornerstone of modern estate living in
							Africa, setting new standards for community
							management, security, and resident satisfaction
							through cutting-edge technology and unwavering
							commitment to excellence.
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
