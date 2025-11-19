"use client"

import React, { useState } from "react"
import Link from "next/link"
import LogoSlant from "../LogoSlant"
import { usePathname } from "next/navigation"
import MobileNav from "./MobileNav"
import { AnimatedMenuTrigger } from "./MenuTrigger"
import MainNav from "./MainNav"

export const nav = [
	{
		name: "Home",
		link: "/",
	},
	{
		name: "About",
		link: "/about",
	},
	{
		name: "Features",
		link: "/features",
	},
	{
		name: "FAQ",
		link: "/faq",
	},
	{
		name: "Career",
		link: "/career",
	},
	{
		name: "Contact",
		link: "/contact",
	},
]

export type NavLinks = (typeof nav)[number]

export default function Header() {
	const pathname = usePathname()
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen)
	}

	const closeMobileMenu = () => {
		setMobileMenuOpen(false)
	}

	return (
		<header className="fixed z-50 w-screen h-screen md:h-fit max-w-screen p-4">
			<div className="w-full backdrop-blur-md relative p-2 z-50 bg-background/80 container mx-auto flex items-center justify-between rounded-md">
				<Link href={"/"}>
					<LogoSlant />
				</Link>

				{/* Desktop Navigation */}
				<MainNav
					nav={nav}
					pathname={pathname}
				/>

				<div className="md:hidden flex items-center gap-2 w-fit">
					{/* Mobile menu trigger */}
					<AnimatedMenuTrigger
						isOpen={mobileMenuOpen}
						onToggle={toggleMobileMenu}
					/>
				</div>
			</div>

			{/* Mobile navigation */}
			<MobileNav
				closeMobileMenu={closeMobileMenu}
				mobileMenuOpen={mobileMenuOpen}
				nav={nav}
				pathname={pathname}
			/>

		</header>
	)
}
