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

export const RentExpiringSoon = ({
	tenantName,
	propertyName,
	expirationDate,
	timeFrame,
	renewLink,
}: RentExpiringSoonProps) => {
	const previewText = `Your rent for ${propertyName} expires in ${timeFrame}`

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans px-2">
					<Container className="border border-solid border-[#eaeaea] rounded my-10 mx-auto p-5 max-w-[465px]">
						<Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
							Your Rent is Expiring Soon
						</Heading>
						<Text className="text-black text-[14px] leading-6">
							Hello {tenantName},
						</Text>
						<Text className="text-black text-[14px] leading-6">
							Your rental agreement for{" "}
							<strong>{propertyName}</strong> with {config.TITLE}{" "}
							is set to expire on {expirationDate}, in {timeFrame}
							. Please renew your rent to continue your tenancy.
						</Text>
						<Section className="text-center mt-8 mb-8">
							<Button
								className="bg-[#000000] rounded-xl text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
								href={renewLink}
							>
								Renew Rent
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
							To avoid any disruption in your tenancy, please
							renew your rent before the expiration date. Contact
							our team if you have any questions about your
							agreement or the renewal process.
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

export const RentExpiringSoonHTML = async ({
	tenantName,
	propertyName,
	expirationDate,
	timeFrame,
	renewLink,
}: RentExpiringSoonProps) => {
	return await render(
		<RentExpiringSoon
			tenantName={tenantName}
			propertyName={propertyName}
			expirationDate={expirationDate}
			timeFrame={timeFrame}
			renewLink={renewLink}
		/>
	)
}
