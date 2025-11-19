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

export const SubscriptionExpiringSoon = ({
	username,
	planName,
	expirationDate,
	renewLink,
}: SubscriptionExpiringSoonProps) => {
	const previewText = `Your ${planName} subscription is expiring soon`

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans px-2">
					<Container className="border border-solid border-[#eaeaea] rounded my-10 mx-auto p-5 max-w-[465px]">
						<Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
							Your Subscription is Expiring Soon
						</Heading>
						<Text className="text-black text-[14px] leading-6">
							Hello {username},
						</Text>
						<Text className="text-black text-[14px] leading-6">
							Your <strong>{planName}</strong> subscription with{" "}
							{config.TITLE} is set to expire on {expirationDate}.
							Renew now to continue enjoying uninterrupted access
							to all {planName} features.
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
							Don’t want to lose access? Renew your subscription
							before it expires to keep using {config.TITLE}’s
							{planName} features.
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

export const SubscriptionExpiringSoonHTML = async ({
	username,
	planName,
	expirationDate,
	renewLink,
}: SubscriptionExpiringSoonProps) => {
	return await render(
		<SubscriptionExpiringSoon
			username={username}
			planName={planName}
			expirationDate={expirationDate}
			renewLink={renewLink}
		/>
	)
}
