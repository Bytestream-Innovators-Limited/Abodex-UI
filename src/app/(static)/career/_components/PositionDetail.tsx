/* eslint-disable react/no-unescaped-entities */
"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
	MapPinIcon,
	BriefcaseIcon,
	ClockIcon,
	CheckCircleIcon,
} from "lucide-react"

interface Position {
	id: number
	title: string
	department: string
	location: string
	type: string
	description: string
	responsibilities: string[]
	requirements: string[]
	benefits: string[]
}

interface PositionDetailsProps {
	position: Position
}

export function PositionDetails({ position }: PositionDetailsProps) {
	return (
		<div className="space-y-6">
			{/* Position Header */}
			<div className="space-y-3">
				<div className="flex flex-wrap gap-2">
					<Badge variant="secondary">{position.department}</Badge>
					<Badge
						variant={
							position.type === "Remote" ? "default" : "outline"
						}
					>
						{position.type}
					</Badge>
				</div>
				<h2 className="text-2xl font-bold">{position.title}</h2>
				<div className="flex items-center text-sm text-muted-foreground space-x-4">
					<div className="flex items-center">
						<MapPinIcon className="h-4 w-4 mr-1" />
						{position.location}
					</div>
					<div className="flex items-center">
						<BriefcaseIcon className="h-4 w-4 mr-1" />
						Full-time
					</div>
					<div className="flex items-center">
						<ClockIcon className="h-4 w-4 mr-1" />
						Posted recently
					</div>
				</div>
			</div>

			<Separator />

			{/* Description */}
			<div>
				<h3 className="text-lg font-semibold mb-2">About the Role</h3>
				<p className="text-muted-foreground">{position.description}</p>
			</div>

			{/* Responsibilities */}
			<div>
				<h3 className="text-lg font-semibold mb-3">
					Key Responsibilities
				</h3>
				<ul className="space-y-2">
					{position.responsibilities.map((responsibility, index) => (
						<li
							key={index}
							className="flex items-start"
						>
							<CheckCircleIcon className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
							<span className="text-sm">{responsibility}</span>
						</li>
					))}
				</ul>
			</div>

			{/* Requirements */}
			<div>
				<h3 className="text-lg font-semibold mb-3">Requirements</h3>
				<ul className="space-y-2">
					{position.requirements.map((requirement, index) => (
						<li
							key={index}
							className="flex items-start"
						>
							<CheckCircleIcon className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
							<span className="text-sm">{requirement}</span>
						</li>
					))}
				</ul>
			</div>

			{/* Benefits */}
			<div>
				<h3 className="text-lg font-semibold mb-3">Benefits</h3>
				<ul className="space-y-2">
					{position.benefits.map((benefit, index) => (
						<li
							key={index}
							className="flex items-start"
						>
							<CheckCircleIcon className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
							<span className="text-sm">{benefit}</span>
						</li>
					))}
				</ul>
			</div>

			{/* CTA Button */}
			<div className="pt-4">
				<Button className="w-full">Apply for this Position</Button>
				<p className="text-xs text-muted-foreground text-center mt-2">
					You'll be redirected to our application form
				</p>
			</div>
		</div>
	)
}
