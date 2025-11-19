import PageName from "@/components/common/PageName"
import React from "react"
import AboutGrid from "./_components/AboutGrid"

export default function AboutPage() {
	return (
		<div className="container mx-auto pt-8 lg:pt-16 p-6 md:p-10">
			<PageName name="Why Us" />
			<AboutGrid />
		</div>
	)
}
