"use client"

import { motion, AnimatePresence } from "framer-motion"
import { MobileMenuAnimationProps } from "./dto"
import { menuVariants } from "./variants"

export default function EntranceAnimation({
	isOpen,
	direction = "right",
	duration = 0.45,
	children,
	className = "",
}: MobileMenuAnimationProps) {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					variants={menuVariants(direction, duration)}
					initial="closed"
					animate="open"
					exit="closed"
					className={`fixed inset-0 z-40 flex flex-col bg-background p-6 gap-6 overflow-hidden md:hidden ${className}`}
					// Prevents interaction with page behind while exiting
					style={{ pointerEvents: isOpen ? "auto" : "none" }}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	)
}
