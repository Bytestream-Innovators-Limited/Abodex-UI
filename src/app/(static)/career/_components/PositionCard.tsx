"use client"

import React from "react"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPinIcon, BriefcaseIcon } from "lucide-react"

interface Position {
	id: number
	title: string
	department: string
	location: string
	type: string
	description: string
}

interface PositionCardProps {
	position: Position
	onClick: () => void
}

export function PositionCard({ position, onClick }: PositionCardProps) {
	return (
		<Card
			className="cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] border-2 border-transparent hover:border-primary/20"
			onClick={onClick}
		>
			<CardHeader className="pb-3">
				<div className="flex justify-between items-start">
					<Badge
						variant="secondary"
						className="text-xs"
					>
						{position.department}
					</Badge>
					<Badge
						variant={
							position.type === "Remote" ? "default" : "outline"
						}
						className="text-xs"
					>
						{position.type}
					</Badge>
				</div>
				<CardTitle className="text-xl">{position.title}</CardTitle>
				<div className="flex items-center text-sm text-muted-foreground">
					<MapPinIcon className="h-4 w-4 mr-1" />
					{position.location}
				</div>
			</CardHeader>
			<CardContent>
				<CardDescription className="line-clamp-3">
					{position.description}
				</CardDescription>
				<div className="mt-4 flex items-center text-sm text-primary font-medium">
					View Details
					<BriefcaseIcon className="h-4 w-4 ml-1" />
				</div>
			</CardContent>
		</Card>
	)
}
