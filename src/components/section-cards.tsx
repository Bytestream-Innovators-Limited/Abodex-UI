import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
	Card,
	CardAction,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import Image from "next/image"

export function SectionCards() {
	return (
		<div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Total Holding</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						$1,250.00
					</CardTitle>
					<CardAction>
						<Badge
							className="text-green-500"
							variant="outline"
						>
							<IconTrendingUp />
							+12.5%
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Trending up this month{" "}
						<IconTrendingUp className={`"size-4" text-green-500`} />
					</div>
					<div className="text-muted-foreground">
						Earnings from time memorial
					</div>
				</CardFooter>
			</Card>
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Total Referrals</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						1,234
					</CardTitle>
					<CardAction>
						<Badge
							className="text-red-500"
							variant="outline"
						>
							<IconTrendingDown />
							-20%
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Down 20% this period{" "}
						<IconTrendingDown
							className={`"size-4" text-red-500`}
						/>
					</div>
					<div className="text-muted-foreground">
						Refer more to earn
					</div>
				</CardFooter>
			</Card>
			{/* Add the other cards here */}
			<Card className="from-gray-background! to-gray-background! flex-none rounded-xl @3xl/main:col-span-2 w-full border-dashed">
				<CardHeader>
					<CardDescription>My Portfolio</CardDescription>
					<div className="flex items-start overflow-x-auto gap-6 with-full">
						<div className="flex-none p-4 bg-popover bg-linear-to-b from-interactive-3 to-interactive border-[0.075px] rounded-xl gap-6 flex flex-col w-[180px] hover:bg-linear-to-b hover:from-interactive hover:to-gray-interactive-2 ease-in-out transition-all duration-500 cursor-pointer">
							<CardTitle className="text-base font-semibold tabular-nums @[250px]/card:text-xl">
								<span className="flex w-fit">$45,678.00</span>
								<Badge
									className="text-green-500"
									variant="outline"
								>
									<IconTrendingUp />
									+12.5%
								</Badge>
							</CardTitle>
							<div className="flex items-end gap-1.5 text-xs justify-between">
								<div className="line-clamp-1 flex flex-col gap-2 font-medium">
									<Image
										src={"/logos/tsla.svg"}
										alt=""
										width={120}
										height={120}
										className="w-6 h-6"
									/>
									<span className="text-xs flex w-fit">
										TSLA
									</span>
								</div>
								<div className="text-muted-foreground">
									Units: <strong>44</strong>
								</div>
							</div>
						</div>
					</div>
				</CardHeader>
			</Card>
		</div>
	)
}
