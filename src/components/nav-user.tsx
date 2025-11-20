"use client"

import {
	BadgeCheck,
	Bell,
	ChevronsUpDown,
	CogIcon,
	CreditCard,
	LogOut,
	Sparkles,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/authClient"
import { Skeleton } from "./ui/skeleton"

export function NavUser({
	user,
}: {
	user: {
		name: string
		email: string
		avatar: string
	}
}) {
	const { isMobile } = useSidebar()
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

	if (!session || isPending) {
		return <Skeleton className="h-8 w-full" />
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage
									src={session.user.image || ""}
									alt={session.user.name}
								/>
								<AvatarFallback className="rounded-lg">
									CN
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">
									{session.user.name}
								</span>
								<span className="truncate text-xs">
									{session.user.email}
								</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage
										src={session.user.image || ""}
										alt={session.user.name}
									/>
									<AvatarFallback className="rounded-lg">
										CN
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">
										{session.user.name}
									</span>
									<span className="truncate text-xs">
										{session.user.email}
									</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem
								onClick={() =>
									router.push("/dashboard/upgrade")
								}
                className="cursor-pointer"
							>
								<Sparkles />
								Upgrade to Pro
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem
								onClick={() =>
									router.push("/dashboard/profile")
								}
                className="cursor-pointer"
							>
								<BadgeCheck />
								Account
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() =>
									router.push("/dashboard/settings")
								}
                className="cursor-pointer"
							>
								<CogIcon />
								Settings
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() =>
									router.push("/dashboard/notifications")
								}
                className="cursor-pointer"
							>
								<Bell />
								Notifications
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							variant="destructive"
							onClick={logout}
              className="cursor-pointer"
						>
							<LogOut />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
