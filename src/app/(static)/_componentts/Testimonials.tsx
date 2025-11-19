/* eslint-disable react/no-unescaped-entities */
// components/landing/testimonials-section.tsx
"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarIcon, QuoteIcon } from "lucide-react"
import Image from "next/image"
import { testimonials } from "@/data/testimonials"

export function TestimonialsSection() {
	return (
		<section className="py-16 md:py-24 bg-muted">
			<div className="container mx-auto px-4">
				<div className="text-center space-y-4 mb-12">
					<Badge
						variant="outline"
						className="w-fit"
					>
						Testimonials
					</Badge>
					<h2 className="text-3xl md:text-4xl font-bold tracking-tight">
						What Our Users Say About Abodex
					</h2>
					<p className="text-lg text-muted-foreground max-w-3xl mx-auto">
						Don't just take our word for it. Hear from estate
						managers, residents, and landlords who have transformed
						their communities with Abodex.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{testimonials.map((testimonial, index) => (
						<Card
							key={index}
							className="h-full"
						>
							<CardContent className="p-6 space-y-4 h-full flex flex-col">
								<div className="flex items-center space-x-0">
									{[...Array(testimonial.rating)].map(
										(_, i) => (
											<StarIcon
												key={i}
												className="h-4 w-4 fill-yellow-400 text-yellow-400"
											/>
										)
									)}
								</div>

								<div className="relative grow">
									<QuoteIcon className="h-8 w-8 text-primary/50 absolute -top-2 -left-2" />
									<p className="text-muted-foreground relative z-10 pl-8">
										{testimonial.content}
									</p>
								</div>

								<div className="flex items-center space-x-4 pt-4">
									<div className="relative w-12 h-12 rounded-full overflow-hidden">
										<Image
											src={testimonial.image}
											alt={testimonial.name}
											fill
											className="object-cover"
										/>
									</div>
									<div>
										<div className="font-medium">
											{testimonial.name}
										</div>
										<div className="text-sm text-muted-foreground">
											{testimonial.role}
										</div>
										<div className="text-xs text-primary">
											{testimonial.estate}
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}
