import { Variants } from "framer-motion"
import { EntranceDirection } from "./dto"

const containerVariants: Variants = {
    open: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.3,
        },
    },
    closed: {
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
}

const itemVariants: Variants = {
    open: {
        opacity: 1,
        y: 0,
        transition: {
            ease: [0.32, 0, 0.72, 1],
            duration: 0.6,
        },
    },
    closed: {
        opacity: 0,
        y: 40,
    },
}

const directionalItemVariants = (
    direction: EntranceDirection
): Variants => ({
    open: {
        opacity: 1,
        x:
            direction === "left"
                ? [-60, 0]
                : direction === "right"
                    ? [60, 0]
                    : 0,
        y:
            direction === "top"
                ? [-40, 0]
                : direction === "bottom"
                    ? [40, 0]
                    : 0,
        transition: { ease: [0.32, 0, 0, 1], duration: 0.6 },
    },
    closed: {
        opacity: 0,
        x: direction === "left" ? -60 : direction === "right" ? 60 : 0,
        y: direction === "top" ? -40 : direction === "bottom" ? 40 : 0,
    },
})

const menuVariants = (direction: EntranceDirection, duration: number): Variants => ({
    open: {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        transition: {
            type: direction === "center" ? "spring" : "tween",
            stiffness: direction === "center" ? 320 : undefined,
            damping: direction === "center" ? 30 : undefined,
            duration: direction !== "center" ? duration : undefined,
            ease: direction !== "center" ? [0.32, 0, 0, 1] : undefined, // circOut-like feel
            when: "beforeChildren",
            staggerChildren: 0.12,
            delayChildren: direction === "center" ? 0.15 : 0.25,
        },
    },
    closed: {
        opacity: 0,
        scale: direction === "center" ? 0.94 : 1,
        x:
            direction === "left"
                ? "-100%"
                : direction === "right"
                    ? "100%"
                    : 0,
        y:
            direction === "top"
                ? "-100%"
                : direction === "bottom"
                    ? "100%"
                    : 0,
        transition: {
            duration: duration * 0.8,
            when: "afterChildren",
            staggerChildren: 0.06,
            staggerDirection: -1,
        },
    },
})

export { containerVariants, itemVariants, directionalItemVariants, menuVariants }