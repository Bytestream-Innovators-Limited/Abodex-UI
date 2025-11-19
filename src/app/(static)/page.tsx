import { Hero } from "@/components/common/Hero"
import { FAQ } from "./_componentts/FAQ"
import AboutSection from "./_componentts/About"
import { CTASection } from "./_componentts/CTA"
import { TestimonialsSection } from "./_componentts/Testimonials"
import { StatsSection } from "./_componentts/Stats"

export default function Home() {
	return (
		<>
			<Hero />
			<AboutSection />
			<StatsSection />
			<TestimonialsSection />
			<FAQ />
			<CTASection />
		</>
	)
}
