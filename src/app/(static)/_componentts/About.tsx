/* eslint-disable react/no-unescaped-entities */
"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { HomeIcon, ShieldIcon } from "lucide-react"
import React from "react"
import Image from "next/image"

export default function AboutSection() {
	const router = useRouter()

	return (
		<section className="w-screen bg-card py-16 md:py-24">
			<div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
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
								through innovative technology that creates
								seamless, secure, and enjoyable living
								experiences for residents while simplifying
								operations for estate administrators.
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
								To become the cornerstone of modern estate
								living in Africa, setting new standards for
								community management, security, and resident
								satisfaction through cutting-edge technology and
								unwavering commitment to excellence.
							</p>
						</CardContent>
					</Card>
				</div>
				<div className="space-y-6">
					<Badge
						variant="outline"
						className="w-fit"
					>
						Our Story
					</Badge>
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
						Redefining Estate Living for the Modern World
					</h2>
					<div className="space-y-4 text-sm lg:text-lg text-muted-foreground">
						<p>
							Abodex emerged from a simple observation: Nigerian
							estates deserved better. In 2020, our founders
							experienced firsthand the daily frustrations that
							plagued gated communities—from inefficient levy
							collections to poor communication and maintenance
							nightmares.
						</p>
						<p>
							What began as a solution to address these pain
							points has evolved into Nigeria's leading estate
							management platform. We've transformed how over 500
							communities operate, bringing transparency,
							efficiency, and modern technology to traditional
							estate management.
						</p>
						<p>
							Today, Abodex stands as a testament to Nigerian
							innovation, proving that homegrown solutions can
							solve local challenges with world-class technology.
							We're not just managing estates; we're building
							communities where residents can truly enjoy the
							luxury living they deserve.
						</p>
					</div>
					<div className="pt-4">
						<Button
							onClick={() => router.push("/about")}
							size="lg"
							className="group"
						>
							Discover Our Journey
							<ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Button>
					</div>
				</div>
			</div>
		</section>
	)
}
