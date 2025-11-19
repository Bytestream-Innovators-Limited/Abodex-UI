"use client"

import { config } from "@/config"
import { ModeToggle } from "@/components/common/Mode"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbLink,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment } from "react"

interface BreadcrumbData {
	href: string
	label: string
}

export function DashboardBreadcrumbs() {
	const pathname = usePathname()

	// Generate breadcrumbs based on current path
	const breadcrumbs = generateBreadcrumbs(pathname)

	return (
		<header className="bg-background sticky top-0 flex h-14 shrink-0 items-center gap-2 z-40">
			<div className="flex flex-1 items-center gap-2 px-3 pr-5">
				<SidebarTrigger />
				<Separator
					orientation="vertical"
					className="mr-2 data-[orientation=vertical]:h-4"
				/>
				<Breadcrumb>
					<BreadcrumbList>
						{breadcrumbs.map((breadcrumb, index) => (
							<Fragment key={breadcrumb.href}>
								<BreadcrumbItem>
									{index === breadcrumbs.length - 1 ? (
										<BreadcrumbPage className="line-clamp-1">
											{breadcrumb.label}
										</BreadcrumbPage>
									) : (
										<BreadcrumbLink asChild>
											<Link href={breadcrumb.href}>
												{breadcrumb.label}
											</Link>
										</BreadcrumbLink>
									)}
								</BreadcrumbItem>
								{index < breadcrumbs.length - 1 && (
									<BreadcrumbSeparator />
								)}
							</Fragment>
						))}
					</BreadcrumbList>
				</Breadcrumb>
				<div className="ml-auto flex items-center gap-2">
					<ModeToggle />
				</div>
			</div>
		</header>
	)
}

// Helper function to generate breadcrumbs from pathname
function generateBreadcrumbs(pathname: string): BreadcrumbData[] {
	const pathSegments = pathname.split("/").filter((segment) => segment !== "")

	const breadcrumbs = pathSegments.map((segment, index) => {
		const href = "/" + pathSegments.slice(0, index + 1).join("/")
		const label = formatBreadcrumbLabel(segment)

		return { href, label }
	})

	// Always start with dashboard if we're in dashboard routes
	if (pathname.startsWith("/dashboard")) {
		return [
			{ href: "/dashboard", label: "Dashboard" },
			...breadcrumbs.slice(1),
		]
	}

	// Add home breadcrumb if not already included
	return [{ href: "/", label: config.TITLE }, ...breadcrumbs]
}

// Helper function to format breadcrumb labels
function formatBreadcrumbLabel(segment: string): string {
	return segment
		.split(/[-_]/)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ")
}
