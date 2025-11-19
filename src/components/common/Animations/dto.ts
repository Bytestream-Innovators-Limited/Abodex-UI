import { ReactNode } from "react"

export type EntranceDirection = "top" | "bottom" | "left" | "right" | "center"

export interface MobileMenuAnimationProps {
    isOpen: boolean
    direction?: EntranceDirection
    children: ReactNode
    duration?: number // total entrance duration in seconds
    className?: string
}