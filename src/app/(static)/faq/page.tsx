import PageName from "@/components/common/PageName"
import React from "react"
import FAQGrid from "./_components/Grid"

export default function FAQPage() {
	return (
		<div className="container mx-auto pt-8 lg:pt-16 p-6 md:p-10">
			<PageName name="Want Answers" />
			<FAQGrid />
		</div>
	)
}
