"use client"

import React, { forwardRef, useRef } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/components/ui/animated-beam"

const Circle = forwardRef<
	HTMLDivElement,
	{ className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
	return (
		<div
			ref={ref}
			className={cn(
				"z-10 flex size-12 items-center justify-center rounded-full border-2 bg-muted p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
				className
			)}
		>
			{children}
		</div>
	)
})

Circle.displayName = "Circle"

export function AnimatedBeamDemo() {
	const containerRef = useRef<HTMLDivElement>(null)
	const centerRef = useRef<HTMLDivElement>(null)
	const levyRef = useRef<HTMLDivElement>(null)
	const rentRef = useRef<HTMLDivElement>(null)
	const maintenanceRef = useRef<HTMLDivElement>(null)
	const chatRef = useRef<HTMLDivElement>(null)
	const aiRef = useRef<HTMLDivElement>(null)
	const escrowRef = useRef<HTMLDivElement>(null)
	const purchaseRef = useRef<HTMLDivElement>(null)

	return (
		<div
			className="relative flex h-[500px] w-full items-center justify-center overflow-hidden p-10"
			ref={containerRef}
		>
			<div className="flex size-full max-h-[400px] max-w-lg flex-col items-stretch justify-between gap-10">
				<div className="flex flex-row items-center justify-between">
					<Circle ref={levyRef}>
						<Icons.levy />
					</Circle>
					<Circle ref={rentRef}>
						<Icons.rent />
					</Circle>
				</div>
				<div className="flex flex-row items-center justify-between">
					<Circle ref={maintenanceRef}>
						<Icons.maintenance />
					</Circle>
					<div
						ref={centerRef}
						className="z-10 flex size-24 items-center justify-center rounded-full border-2 bg-muted p-2 shadow-[0_0_30px_-12px_rgba(0,0,0,0.8)]"
					>
						<Image
							src="/logo.png"
							alt="Abodex Logo"
							width={80}
							height={80}
							className="object-contain"
						/>
					</div>
					<Circle ref={chatRef}>
						<Icons.chat />
					</Circle>
				</div>
				<div className="flex flex-row items-center justify-between">
					<Circle ref={aiRef}>
						<Icons.ai />
					</Circle>
					<Circle ref={escrowRef}>
						<Icons.escrow />
					</Circle>
					<Circle ref={purchaseRef}>
						<Icons.purchase />
					</Circle>
				</div>
			</div>

			<AnimatedBeam
				containerRef={containerRef}
				fromRef={levyRef}
				toRef={centerRef}
				curvature={-75}
				endYOffset={-10}
			/>
			<AnimatedBeam
				containerRef={containerRef}
				fromRef={rentRef}
				toRef={centerRef}
				curvature={-40}
				endYOffset={-5}
			/>
			<AnimatedBeam
				containerRef={containerRef}
				fromRef={maintenanceRef}
				toRef={centerRef}
			/>
			<AnimatedBeam
				containerRef={containerRef}
				fromRef={chatRef}
				toRef={centerRef}
			/>
			<AnimatedBeam
				containerRef={containerRef}
				fromRef={aiRef}
				toRef={centerRef}
				curvature={40}
				endYOffset={5}
			/>
			<AnimatedBeam
				containerRef={containerRef}
				fromRef={escrowRef}
				toRef={centerRef}
				curvature={75}
				endYOffset={10}
			/>
			<AnimatedBeam
				containerRef={containerRef}
				fromRef={purchaseRef}
				toRef={centerRef}
				curvature={75}
				endYOffset={10}
			/>
		</div>
	)
}

const Icons = {
	levy: () => (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1.81.45 1.61 1.67 1.61 1.16 0 1.6-.64 1.6-1.46 0-.84-.68-1.22-1.88-1.54-1.76-.47-3.43-1.17-3.43-3.27 0-1.67 1.29-2.86 3.04-3.21V4h2.67v2.06c1.42.38 2.56 1.43 2.68 3.15h-1.96c-.08-.8-.44-1.46-1.42-1.46-1.03 0-1.51.6-1.51 1.38 0 .74.63 1.15 1.88 1.45 1.85.49 3.48 1.13 3.48 3.42 0 1.81-1.38 3.09-3.34 3.09z"
				fill="#3b82f6"
			/>
		</svg>
	),
	rent: () => (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
				fill="#10b981"
			/>
		</svg>
	),
	maintenance: () => (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"
				fill="#f59e0b"
			/>
		</svg>
	),
	chat: () => (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"
				fill="#8b5cf6"
			/>
		</svg>
	),
	ai: () => (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
				fill="#ef4444"
			/>
		</svg>
	),
	escrow: () => (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"
				fill="#06b6d4"
			/>
		</svg>
	),
	purchase: () => (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"
				fill="#ec4899"
			/>
		</svg>
	),
}
