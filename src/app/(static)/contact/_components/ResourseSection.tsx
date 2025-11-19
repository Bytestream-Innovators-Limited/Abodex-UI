// components/contact/resources-section.tsx
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle, BookOpen } from "lucide-react"
import Link from "next/link"

export function ResourcesSection() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
			<div className="">
				<CardHeader>
					<CardTitle className="font-bold flex items-center gap-2">
						<HelpCircle className="h-5 w-5" />
						FAQ
					</CardTitle>
				</CardHeader>
				<CardContent className=" text-sm">
					<p className="text-muted-foreground mb-4">
						Browse common questions about our features and process.
					</p>
					<Link
						href={"/faq"}
						className="w-full justify-between"
					>
						Browse frequently asked questions
					</Link>
				</CardContent>
			</div>

			<div className="">
				<CardHeader>
					<CardTitle className="font-bold flex items-center gap-2">
						<BookOpen className="h-5 w-5" />
						Resources
					</CardTitle>
				</CardHeader>
				<CardContent className=" text-sm">
					<p className="text-muted-foreground mb-4">
						Access our resource center for guides, case studies, and
						more.
					</p>
					<Link
						href={"/features"}
						className="w-full justify-between"
					>
						Visit resource center
					</Link>
				</CardContent>
			</div>
		</div>
	)
}
