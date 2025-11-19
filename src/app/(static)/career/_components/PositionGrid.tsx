"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { BriefcaseIcon, FilterIcon } from "lucide-react"
import { PositionCard } from "./PositionCard"
import { ResponsiveModal } from "@/components/common/ResponsiveModal"
import { PositionDetails } from "./PositionDetail"
import { positions } from "@/data/positions"

export default function PositionsPage() {
	const [selectedPosition, setSelectedPosition] = React.useState<
		number | null
	>(null)
	const [isModalOpen, setIsModalOpen] = React.useState(false)
	const [filter, setFilter] = React.useState("All Departments")

	const filteredPositions =
		filter === "All Departments"
			? positions
			: positions.filter((position) => position.department === filter)

	const handlePositionClick = (positionId: number) => {
		setSelectedPosition(positionId)
		setIsModalOpen(true)
	}

	const position = selectedPosition
		? positions.find((p) => p.id === selectedPosition)
		: null

	return (
		<div className="container mx-auto px-4 py-12 md:py-16">
			{/* Page Header */}
			<div className="mb-12 text-center">
				<h1 className="text-3xl font-bold tracking-tight md:text-4xl">
					Open Positions
				</h1>
				<p className="mt-4 text-lg text-muted-foreground">
					Join our team and help shape the future of estate management
				</p>
			</div>

			{/* Filter Section */}
			<div className="mb-8 flex justify-center">
				<div className="relative inline-block">
					<Button
						variant="outline"
						className="flex items-center gap-2 pr-10"
						onClick={() => {
							// Toggle between departments
							if (filter === "All Departments") {
								setFilter("Engineering & Development")
							} else if (filter === "Engineering & Development") {
								setFilter("Product Management")
							} else {
								setFilter("All Departments")
							}
						}}
					>
						<FilterIcon className="h-4 w-4" />
						{filter}
					</Button>
				</div>
			</div>

			{/* Positions Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredPositions.map((position) => (
					<PositionCard
						key={position.id}
						position={position}
						onClick={() => handlePositionClick(position.id)}
					/>
				))}
			</div>

			{/* No Positions Found */}
			{filteredPositions.length === 0 && (
				<div className="text-center py-12">
					<BriefcaseIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
					<h3 className="text-lg font-medium mb-2">
						No positions found
					</h3>
					<p className="text-muted-foreground">
						There are currently no open positions in this
						department. Check back later!
					</p>
				</div>
			)}

			{/* Position Details Modal */}
			<ResponsiveModal
				open={isModalOpen}
				onOpenChange={setIsModalOpen}
				title={position?.title || "Position Details"}
				size="xl"
			>
				{position && <PositionDetails position={position} />}
			</ResponsiveModal>
		</div>
	)
}