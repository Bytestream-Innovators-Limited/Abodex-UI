import PageName from "@/components/common/PageName"
import React from "react"
import PositionsPage from "./_components/PositionGrid"

export default function CareerPage() {
	return (
		<div className="container mx-auto pt-8 lg:pt-16 p-6 md:p-10">
			<PageName name="Our Openings" />
			<PositionsPage />
		</div>
	)
}
