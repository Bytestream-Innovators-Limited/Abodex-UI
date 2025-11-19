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

export const RentIncrementNotification = ({
	tenantName,
	propertyName,
	currentRentAmount,
	newRentAmount,
	effectiveDate,
	gracePeriod,
	confirmLink,
	disputeLink,
}: RentIncrementNotificationProps) => {
	const previewText = `Rent Increase Notification for ${propertyName}`

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans px-2">
					<Container className="border border-solid border-[#eaeaea] rounded my-10 mx-auto p-5 max-w-[465px]">
						<Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
							Rent Increase Notification
						</Heading>
						<Text className="text-black text-[14px] leading-6">
							Hello {tenantName},
						</Text>
						<Text className="text-black text-[14px] leading-6">
							We are writing to inform you that the rent for{" "}
							<strong>{propertyName}</strong> with {config.TITLE}{" "}
							will be adjusted from {currentRentAmount} to{" "}
							<strong>{newRentAmount}</strong>, effective{" "}
							<strong>{effectiveDate}</strong>.
						</Text>
						<Text className="text-black text-[14px] leading-6">
							Please confirm your acceptance of this rent increase
							or let us know if you wish to dispute it by using
							the buttons below. Upon the expiration of your
							current rental agreement, you will have a grace
							period of {gracePeriod} to make the adjusted
							payment. Failure to pay the new rent amount after
							the grace period may result in legal action to
							enforce the payment, as per your rental agreement.
						</Text>
						<Section className="text-center mt-8 mb-8 grid gap-4">
							<Button
								className="bg-[#000000] rounded-xl text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
								href={confirmLink}
							>
								Confirm Rent Increase
							</Button>
							<Button
								className="bg-[#ff0000] rounded-xl text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
								href={disputeLink}
							>
								Dispute Rent Increase
							</Button>
						</Section>
						<Text className="text-black text-[14px] leading-6">
							Alternatively, you can copy and paste these URLs
							into your browser:
							<br />
							Confirm:{" "}
							<Link
								href={confirmLink}
								className="text-blue-600 no-underline"
							>
								{confirmLink}
							</Link>
							<br />
							Dispute:{" "}
							<Link
								href={disputeLink}
								className="text-blue-600 no-underline"
							>
								{disputeLink}
							</Link>
						</Text>
						<Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
						<Text className="text-[#666666] text-[12px] leading-6">
							<strong>Important:</strong> Please respond by
							confirming or disputing the rent increase before{" "}
							{effectiveDate}. If you do not respond, the new rent
							amount will apply after your current rental period
							ends, and payment will be expected within the{" "}
							{gracePeriod}
							grace period.
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

export const RentIncrementNotificationHTML = async ({
	tenantName,
	propertyName,
	currentRentAmount,
	newRentAmount,
	effectiveDate,
	gracePeriod,
	confirmLink,
	disputeLink,
}: RentIncrementNotificationProps) => {
	return await render(
		<RentIncrementNotification
			tenantName={tenantName}
			propertyName={propertyName}
			currentRentAmount={currentRentAmount}
			newRentAmount={newRentAmount}
			effectiveDate={effectiveDate}
			gracePeriod={gracePeriod}
			confirmLink={confirmLink}
			disputeLink={disputeLink}
		/>
	)
}
