import { config } from "@/config"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function LogoSlant({ className = "w-auto h-7" }: { className?: string }) {
	return (
		<div className="flex items-center gap-1 cursor-pointer">
			<Image
				alt="logo"
				src={"/logo.png"}
				width={2100}
				height={620}
				className={cn("dark:hidden", className)}
			/>
			<Image
				alt="logo"
				src={"/logo-primary-dark.png"}
				width={2100}
				height={620}
				className={cn("hidden dark:block", className)}
			/>
			<span className="font-semibold text-lg">{config.TITLE}</span>
		</div>
	)
}
