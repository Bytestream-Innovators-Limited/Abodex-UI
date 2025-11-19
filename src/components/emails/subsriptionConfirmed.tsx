import { config } from "@/config"
import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Link,
	Preview,
	Text,
	Tailwind,
	Section,
	render,
} from "@react-email/components"

export const SubscriptionConfirmation = ({
	username,
	planName,
	startDate,
	dashboardLink,
}: SubscriptionConfirmationProps) => {
	const previewText = `Welcome to ${planName}!`

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans px-2">
					<Container className="border border-solid border-[#eaeaea] rounded my-10 mx-auto p-5 max-w-[465px]">
						<Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
							Subscription Confirmed
						</Heading>
						<Text className="text-black text-[14px] leading-6">
							Hello {username},
						</Text>
						<Text className="text-black text-[14px] leading-6">
							Thank you for subscribing to the{" "}
							<strong>{planName}</strong> plan with {config.TITLE}
							! Your subscription started on {startDate}, and you
							now have access to all {planName} features.
						</Text>
						<Section className="text-center mt-8 mb-8">
							<Button
								className="bg-[#000000] rounded-xl text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
								href={dashboardLink}
							>
								Go to Dashboard
							</Button>
						</Section>
						<Text className="text-black text-[14px] leading-6">
							You can manage your subscription or explore your new
							features by visiting your dashboard.
						</Text>
						<Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
						<Text className="text-[#666666] text-[12px] leading-6">
							Need help? Contact our support team at{" "}
							<Link
								href={`mailto:${
									config.EMAIL_COMPLAINTS ||
									"support@" + config.DOMAIN
								}`}
								className="text-blue-600 no-underline"
							>
								support
							</Link>
						</Text>
						<Text className="text-[#666666] text-[12px] leading-6">
							© {new Date().getFullYear()} {config.TITLE}, All
							rights reserved.
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	)
}

export const SubscriptionConfirmationHTML = async ({
	username,
	planName,
	startDate,
	dashboardLink,
}: SubscriptionConfirmationProps) => {
	return await render(
		<SubscriptionConfirmation
			username={username}
			planName={planName}
			startDate={startDate}
			dashboardLink={dashboardLink}
		/>
	)
}
