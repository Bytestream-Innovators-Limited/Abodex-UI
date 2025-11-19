import { motion } from "framer-motion"

// Reusable floating animation configuration
const createFloatingVariant = (
	duration: number,
	distanceY?: number,
	distanceX?: number
) => ({
	float: {
		y: distanceY ? [0, -distanceY, 0] : undefined,
		x: distanceX ? [0, -distanceX, 0] : undefined,
		transition: {
			duration,
			repeat: Infinity,
			repeatType: "loop" as const,
			ease: "easeInOut",
		},
	},
})

// Floating wrapper component
export const FloatingElement = ({
	children,
	floatDistance = 15,
	floatDirection = "up", // "up", "down", "left", "right", or "both"
	floatDuration = 2,
	className = "",
}: {
	children: React.ReactNode
	floatDistance?: number
	floatDirection?: "up" | "down" | "left" | "right" | "both"
	floatDuration?: number
	className?: string
}) => {
	// Calculate distances based on direction
	const getDistances = () => {
		switch (floatDirection) {
			case "up":
				return { distanceY: floatDistance, distanceX: 0 }
			case "down":
				return { distanceY: -floatDistance, distanceX: 0 }
			case "left":
				return { distanceY: 0, distanceX: -floatDistance }
			case "right":
				return { distanceY: 0, distanceX: floatDistance }
			case "both":
				return { distanceY: floatDistance, distanceX: floatDistance }
			default:
				return { distanceY: floatDistance, distanceX: 0 }
		}
	}

	const { distanceY, distanceX } = getDistances()
	const variants = createFloatingVariant(floatDuration, distanceY, distanceX)

	return (
		<motion.div
			className={className}
			// @ts-expect-error variants missing
			variants={variants}
			animate="float"
		>
			{children}
		</motion.div>
	)
}
