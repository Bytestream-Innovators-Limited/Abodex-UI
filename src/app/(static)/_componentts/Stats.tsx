/* eslint-disable react/no-unescaped-entities */
// components/landing/stats-section.tsx
"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { stats } from "@/data/stats"

export function StatsSection() {
	return (
		<section className="py-16 md:py-24 bg-muted/20">
			<div className="container mx-auto px-4">
				<div className="text-center space-y-4 mb-12">
					<Badge
						variant="outline"
						className="w-fit"
					>
						Our Impact
					</Badge>
					<h2 className="text-3xl md:text-4xl font-bold tracking-tight">
						Transforming Nigerian Estates, One Community at a Time
					</h2>
					<p className="text-lg text-muted-foreground max-w-3xl mx-auto">
						Our numbers reflect the trust Nigerian communities place
						in us. We're proud to be the technology partner of
						choice for estates seeking to modernize their
						operations.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{stats.map((stat, index) => (
						<Card
							key={index}
							className="text-center"
						>
							<CardContent className="p-6 space-y-4">
								<div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 p-2 mx-auto">
									<stat.icon className="h-6 w-6 text-primary" />
								</div>
								<div className="text-3xl font-bold">
									{stat.value}
								</div>
								<div className="text-sm font-medium">
									{stat.label}
								</div>
								<div className="text-xs text-muted-foreground">
									{stat.description}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}
