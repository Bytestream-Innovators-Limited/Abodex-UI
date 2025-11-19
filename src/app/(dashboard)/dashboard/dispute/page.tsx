import React from "react"

export default function page() {
	return (
		<div className="flex flex-col gap-4 py-4 md:gap-6 2xl:gap-6 md:py-6">
			<h1 className="text-2xl font-semibold mb-4 p-4">Dispute</h1>
			<div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 p-4 @max-3xl:px"></div>
		</div>
	)
}
