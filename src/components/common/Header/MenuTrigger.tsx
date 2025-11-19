import { motion, Variants } from "framer-motion"
import { Button } from "@/components/ui/button" // assuming you have shadcn Button, otherwise use a plain button/div
import { HiOutlineMenuAlt3 } from "react-icons/hi"
import { X } from "lucide-react"
import { ModeToggle } from "../Mode"
import { cn } from "@/lib/utils"

interface AnimatedMenuTriggerProps {
	isOpen: boolean
	onToggle: () => void
	className?: string
}

const menuIconVariants: Variants = {
	closed: {
		opacity: 1,
		rotate: 0,
		scale: 1,
	},
	open: {
		opacity: 0,
		rotate: 90,
		scale: 0.7,
	},
}

const xIconVariants: Variants = {
	closed: {
		opacity: 0,
		rotate: -90,
		scale: 0.7,
	},
	open: {
		opacity: 1,
		rotate: 0,
		scale: 1,
	},
}

const iconTransition = {
	type: "spring",
	stiffness: 420,
	damping: 30,
}

export const AnimatedMenuTrigger = ({
	isOpen,
	onToggle,
	className = "",
}: AnimatedMenuTriggerProps) => {
	return (
		<>
			<ModeToggle />

			<Button
				variant="ghost"
				size="icon"
				type="button"
				onClick={onToggle}
				className={cn(
					"w-10 h-10 relative rounded-full transition-all duration-300 hover:bg-accent/80 active:scale-95 md:hidden",
					className
				)}
				aria-label={isOpen ? "Close menu" : "Open menu"}
			>
				{/* Hamburger Icon */}
				<motion.div
					className="absolute inset-0 flex items-center justify-center"
					variants={menuIconVariants}
					initial="closed"
					animate={isOpen ? "open" : "closed"}
					// @ts-expect-error transition issue
					transition={iconTransition}
					style={{ originX: 0.5, originY: 0.5 }}
				>
					<HiOutlineMenuAlt3 className="h-6 w-6" />
				</motion.div>

				{/* X Icon */}
				<motion.div
					className="absolute inset-0 flex items-center justify-center"
					variants={xIconVariants}
					initial="closed"
					animate={isOpen ? "open" : "closed"}
					// @ts-expect-error transition issue
					transition={iconTransition}
					style={{ originX: 0.5, originY: 0.5 }}
				>
					<X className="h-6 w-6" />
				</motion.div>
			</Button>
		</>
	)
}
