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

export const SubscriptionExpired = ({
	username,
	planName,
	expirationDate,
	renewLink,
}: SubscriptionExpiredProps) => {
	const previewText = `Your ${planName} subscription has expired`

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans px-2">
					<Container className="border border-solid border-[#eaeaea] rounded my-10 mx-auto p-5 max-w-[465px]">
						<Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
							Your Subscription Has Expired
						</Heading>
						<Text className="text-black text-[14px] leading-6">
							Hello {username},
						</Text>
						<Text className="text-black text-[14px] leading-6">
							Your <strong>{planName}</strong> subscription with{" "}
							{config.TITLE} expired on {expirationDate}. You no
							longer have access to {planName} features.
						</Text>
						<Text className="text-black text-[14px] leading-6">
							Renew your subscription to regain access to all the
							benefits of
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
							If you choose not to renew, your account will remain
							active with limited access. You can renew at any
							time to restore full functionality.
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

export const SubscriptionExpiredHTML = async ({
	username,
	planName,
	expirationDate,
	renewLink,
}: SubscriptionExpiredProps) => {
	return await render(
		<SubscriptionExpired
			username={username}
			planName={planName}
			expirationDate={expirationDate}
			renewLink={renewLink}
		/>
	)
}
