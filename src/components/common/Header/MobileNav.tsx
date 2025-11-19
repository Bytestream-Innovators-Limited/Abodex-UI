"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { containerVariants, itemVariants } from "../Animations/variants"
import EntranceAnimation from "../Animations/EntranceAnimation"
import { NavLinks } from "./Header"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/authClient"
import { Skeleton } from "@/components/ui/skeleton"

export default function MobileNav({
	mobileMenuOpen,
	nav,
	pathname,
	closeMobileMenu,
}: {
	closeMobileMenu: () => void
	pathname: string
	nav: NavLinks[]
	mobileMenuOpen: boolean
}) {
	const router = useRouter()
	const { data: session, isPending } = authClient.useSession()

	const logout = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/") // redirect to login page
				},
			},
		})
	}

	return (
		<EntranceAnimation
			isOpen={mobileMenuOpen}
			direction="right"
			duration={0.4}
		>
			{/* Navigation Links */}
			<motion.nav
				className="flex flex-col gap-6 pt-20"
				variants={containerVariants}
			>
				{nav.map((n, i) => (
					<motion.div
						key={i}
						variants={itemVariants}
						className={`border-b border-border/50 pb-2 ${
							pathname === n!.link && "font-bold"
						}`}
					>
						<Link
							href={n!.link}
							className="text-xl flex items-center hover:font-bold ease-in-out transition-all duration-300 cursor-pointer uppercase"
							onClick={closeMobileMenu}
						>
							{/* <span
								className={`text-primary ${
									pathname === n!.link && "mr-1"
								}`}
							>
								#
							</span> */}
							{n!.name}
						</Link>
					</motion.div>
				))}
			</motion.nav>

			<motion.div
				className="absolute bottom-4 left-4 right-4 flex flex-col"
				variants={itemVariants}
				initial="closed"
				animate="open"
				exit="closed"
			>
				<div className="mt-auto flex items-center w-full justify-center">
					{session && session.user ? (
						<div className="grid grid-cols-2 gap-2 w-full">
							<Button
								className={"w-full"}
								onClick={() => router.push("/dashboard")}
							>
								Dashboard
							</Button>
							<Button
								className={"w-full"}
								variant={"destructive"}
								onClick={logout}
							>
								Logout
							</Button>
						</div>
					) : (
						<>
							{session === null || isPending ? (
								<Skeleton className="w-full" />
							) : (
								<Button
									className="w-full"
									onClick={() => router.push("/auth/login")}
								>
									Get Started
								</Button>
							)}
						</>
					)}{" "}
				</div>
			</motion.div>
		</EntranceAnimation>
	)
}
