"use client"

import React from "react"
import FAQs from "./FAQs"
import LeftContent from "./LeftContent"

export default function FAQGrid() {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-16 min-h-[calc(100vh-17rem)]">
			<LeftContent />
			<FAQs />
		</div>
	)
}
