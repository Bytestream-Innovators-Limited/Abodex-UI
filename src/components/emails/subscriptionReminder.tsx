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

export const ResubscriptionReminder = ({
	username,
	planName,
	expirationDate,
	renewLink,
}: ResubscriptionReminderProps) => {
	const previewText = `We miss you! Renew your ${planName} subscription`

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans px-2">
					<Container className="border border-solid border-[#eaeaea] rounded my-10 mx-auto p-5 max-w-[465px]">
						<Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
							We Miss You! Renew Your Subscription
						</Heading>
						<Text className="text-black text-[14px] leading-6">
							Hello {username},
						</Text>
						<Text className="text-black text-[14px] leading-6">
							Your <strong>{planName}</strong> subscription with{" "}
							{config.TITLE} expired on {expirationDate}. We miss
							having you as a premium member!
						</Text>
						<Text className="text-black text-[14px] leading-6">
							Renew now to restore access to all the premium
							features you love and continue your journey with{" "}
							{config.TITLE}.
						</Text>
						<Section className="text-center mt-8 mb-8">
							<Button
								className="bg-[#000000] rounded-xl text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
								href={renewLink}
							>
								Renew Subscription
							</Button>
						</Section>
						<Text className="text-black text-[14px] leading-6">
							Or copy and paste this URL into your browser:{" "}
							<Link
								href={renewLink}
								className="text-blue-600 no-underline"
							>
								{renewLink}
							</Link>
						</Text>
						<Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
						<Text className="text-[#666666] text-[12px] leading-6">
							Don’t miss out on the benefits of your {planName}{" "}
							plan. Renew today to get back to full access!
						</Text>
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

export const ResubscriptionReminderHTML = async ({
	username,
	planName,
	expirationDate,
	renewLink,
}: ResubscriptionReminderProps) => {
	return await render(
		<ResubscriptionReminder
			username={username}
			planName={planName}
			expirationDate={expirationDate}
			renewLink={renewLink}
		/>
	)
}
