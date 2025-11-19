import React from "react"
import { NavLinks } from "./Header"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ModeToggle } from "../Mode"
import { authClient } from "@/lib/authClient"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function MainNav({
	pathname,
	nav,
	className,
}: {
	pathname: string
	nav: NavLinks[]
	className?: string
}) {
	const { data: session } = authClient.useSession()
	const router = useRouter()

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
		<>
			<nav className="hidden md:flex items-center gap-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
				{nav.map((n, i) => (
					<Link
						key={i}
						href={n!.link}
						className={cn(
							`flex items-center hover:font-bold ease-in-out transition-all duration-300 cursor-pointer ${
								pathname === n!.link &&
								!className &&
								"font-bold"
							}`,
							className
						)}
					>
						{/* <span className="text-primary">#</span>  */}
						{n!.name}
					</Link>
				))}
			</nav>
			<div className="hidden md:flex items-center gap-2 ml-12 text-sm">
				<ModeToggle />
				{session && session.user ? (
					<>
						<Button onClick={() => router.push("/dashboard")}>
							Dashboard
						</Button>
						<Button
							variant={"destructive"}
							onClick={logout}
						>
							Logout
						</Button>
					</>
				) : (
					<>
						<Button onClick={() => router.push("/auth/login")}>
							Get Started
						</Button>
					</>
				)}
			</div>
		</>
	)
}
