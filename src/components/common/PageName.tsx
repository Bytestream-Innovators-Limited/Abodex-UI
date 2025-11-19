import React from "react"

export default function PageName({ name }: { name: string }) {
	return (
		<span className="flex text-sm font-medium text-foreground/40 uppercase">
			{name} /
		</span>
	)
}
