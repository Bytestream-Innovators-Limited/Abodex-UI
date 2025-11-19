import React from 'react'
import { AnimatedBeamDemo } from './Integration'

export default function LeftContent() {
  return (
		<div className="mb-16 w-full flex flex-col justify-between">
			<div className="flex flex-col gap-1 mb-16">
				<h1 className="text-2xl lg:text-5xl font-semibold mb-8">
					Discover how estates use our features
				</h1>
				<p className="max-w-xl text-muted-foreground">
					Accelerate growth with our comprehensive suite of tools
					designed for estate and property management.
				</p>
			</div>
			<AnimatedBeamDemo />
		</div>
  )
}
