// components/landing/cta-section.tsx
"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
	ArrowRightIcon,
	CheckCircleIcon,
	ShieldCheckIcon,
	ClockIcon,
} from "lucide-react"
import { useRouter } from "next/navigation"

export function CTASection() {
	const router = useRouter()
	return (
		<section className="py-16 md:py-24 bg-primary text-primary-foreground">
			<div className="container mx-auto px-4 text-center">
				<Badge
					variant="secondary"
					className="w-fit mb-4"
				>
					Get Started Today
				</Badge>
				<h2 className="text-3xl md:text-4xl font-bold mb-6">
					Ready to Transform Your Estate Management?
				</h2>
				<p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
					Join hundreds of Nigerian estates already using Abodex to
					streamline operations, enhance security, and create
					communities residents love.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
					<Button
						size="lg"
						variant="secondary"
						onClick={() => router.push("/contact")}
						className="group bg-secondary-foreground text-secondary hover:bg-secondary hover:text-secondary-foreground duration-300 ease-in-out"
					>
						Request a Demo
						<ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
					</Button>
					<Button
						size="lg"
						onClick={() => router.push("/auth/signup")}
						variant="outline"
						className="border-primary-foreground bg-black! text-foreground hover:bg-muted! hover:text-muted-foreground duration-300 ease-in-out"
					>
						Start For Free
					</Button>
				</div>

				<div className="flex flex-wrap justify-center gap-8 text-sm">
					<div className="flex items-center space-x-2">
						<CheckCircleIcon className="h-5 w-5" />
						<span>No setup fees</span>
					</div>
					<div className="flex items-center space-x-2">
						<CheckCircleIcon className="h-5 w-5" />
						<span>14-day free trial</span>
					</div>
					<div className="flex items-center space-x-2">
						<ShieldCheckIcon className="h-5 w-5" />
						<span>Bank-level security</span>
					</div>
					<div className="flex items-center space-x-2">
						<ClockIcon className="h-5 w-5" />
						<span>24/7 support</span>
					</div>
				</div>
			</div>
		</section>
	)
}
