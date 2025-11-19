"use client"

import React from "react"
import LogoSlant from "./LogoSlant"
import { Separator } from "../ui/separator"
import Image from "next/image"
import { IconBrandGooglePlay, IconBrandAppstore } from "@tabler/icons-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const footerNav = [
	{
		heading: "About Us",
		links: [
			{
				name: "Features",
				link: "/features",
			},
			{
				name: "Career",
				link: "/career",
			},
			{
				name: "Press Kit",
				link: "/media",
			},
		],
	},
	{
		heading: "Legals",
		links: [
			{
				name: "Terms of Service",
				link: "/terms-and-condition",
			},
			{
				name: "Privacy Policy",
				link: "/privacy-policy",
			},
		],
	},
	{
		heading: "Support",
		links: [
			{
				name: "About",
				link: "/about",
			},
			{
				name: "Contact",
				link: "/contact",
			},
			{
				name: "FAQ",
				link: "/faq",
			},
		],
	},
]

export type FooterNavLink = (typeof footerNav)[number]

export default function Footer() {
	const pathname = usePathname()

	return (
		<footer className="px-6 container mx-auto w-full py-14 flex flex-col gap-6">
			<div className="flex flex-col w-full">
				{pathname === "/" && <LogoSlant className="h-24 w-auto" />}
				<Separator className="my-6" />
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					<div className="lg:col-span-1 max-w-lg rounded-xl border-abodex-50 border-2 border-dashed p-4 flex items-center gap-4">
						<Image
							src="/qr-code.png"
							alt="email icon"
							width={320}
							height={320}
							className="shrink-0 h-34 w-auto rounded-xl overflow-hidden"
						/>
						<div className="flex flex-col gap-4">
							<p className="text-md">
								Scan to download App on the playstore and
								appstore
							</p>
							<div className="flex items-center gap-4">
								<IconBrandAppstore className="w-6 h-6" />
								<IconBrandGooglePlay className="w-6 h-6" />
							</div>
						</div>
					</div>
					<div className="lg:max-w-md lg:ml-auto lg:w-full lg:col-span-2 grid grid-cols-2 lg:grid-cols-3">
						{footerNav.map((n, i) => (
							<div
								key={i}
								className="flex flex-col mb-4"
							>
								<h3 className="font-semibold text-lg capitalize mb-2">
									{n.heading}
								</h3>
								{n.links.map((link, j) => (
									<Link
										key={j}
										href={link.link}
										className="text-muted-foreground hover:text-primary ease-in-out duration-300"
									>
										{link.name}
									</Link>
								))}
							</div>
						))}
					</div>
				</div>
				<p className="text-sm text-muted-foreground mt-14">
					&copy; {new Date().getFullYear()} {` `} {` `} All rights
					reserved.
				</p>
			</div>
		</footer>
	)
}
