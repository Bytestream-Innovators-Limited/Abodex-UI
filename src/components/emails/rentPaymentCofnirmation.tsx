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

export const RentPaymentConfirmation = ({
	tenantName,
	propertyName,
	startDate,
	endDate,
	agreementLink,
}: RentPaymentConfirmationProps) => {
	const previewText = `Rent payment confirmed for ${propertyName}`

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans px-2">
					<Container className="border border-solid border-[#eaeaea] rounded my-10 mx-auto p-5 max-w-[465px]">
						<Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
							Rent Payment Confirmed
						</Heading>
						<Text className="text-black text-[14px] leading-6">
							Hello {tenantName},
						</Text>
						<Text className="text-black text-[14px] leading-6">
							Thank you for your rent payment for{" "}
							<strong>{propertyName}</strong> with
							{config.TITLE}. Your new rental period starts on{" "}
							{startDate} and ends on {endDate}.
						</Text>
						<Section className="text-center mt-8 mb-8">
							<Button
								className="bg-[#000000] rounded-xl text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
								href={agreementLink}
							>
								View Rental Agreement
							</Button>
						</Section>
						<Text className="text-black text-[14px] leading-6">
							You can view your rental agreement for{" "}
							{propertyName} by visiting the link below:
							<br />
							<Link
								href={agreementLink}
								className="text-blue-600 no-underline"
							>
								{agreementLink}
							</Link>
						</Text>
						<Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
						<Text className="text-[#666666] text-[12px] leading-6">
							Your tenancy is now active for the new period.
							Please review the agreement for details on your
							rental terms.
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

export const RentPaymentConfirmationHTML = async ({
	tenantName,
	propertyName,
	startDate,
	endDate,
	agreementLink,
}: RentPaymentConfirmationProps) => {
	return await render(
		<RentPaymentConfirmation
			tenantName={tenantName}
			propertyName={propertyName}
			startDate={startDate}
			endDate={endDate}
			agreementLink={agreementLink}
		/>
	)
}
