import Image from "next/image"
import React from "react"

export default function Grid() {
	return (
		<>
			<Image
				src="/abstract/Grid.svg"
				alt="grid"
				width={680}
				height={420}
				aria-hidden="true"
				className="hidden dark:block"
			/>
			<Image
				src="/abstract/GridLight.svg"
				alt="grid"
				width={680}
				height={420}
				aria-hidden="true"
				className="dark:hidden"
			/>
		</>
	)
}
