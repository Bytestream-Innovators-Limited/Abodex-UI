import PageName from "@/components/common/PageName"
import React from "react"
import ContacttGrid from "./_components/ContacttGrid"

export default function ContactPage() {
	return (
		<div className="container mx-auto pt-8 lg:pt-16 p-6 md:p-10">
			<PageName name="Get Started" />
			<ContacttGrid />
		</div>
	)
}
