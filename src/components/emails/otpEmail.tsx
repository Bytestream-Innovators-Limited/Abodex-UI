import { config } from "@/config"
import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Preview,
	Text,
	Tailwind,
	render,
} from "@react-email/components"

interface BetterAuthOTPProps {
	username: string
	otp: string
}

export const OTPEmail = ({ username, otp }: BetterAuthOTPProps) => {
	const previewText = `Your OTP for ${config.TITLE}`
	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans px-2">
					<Container className="border border-solid border-[#eaeaea] rounded my-10 mx-auto p-5 max-w-[465px]">
						<Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
							Your <strong>OTP</strong> {config.TITLE}
						</Heading>
						<Text className="text-black text-[14px] leading-6">
							Hello {username},
						</Text>
						<Text className="text-black text-[14px] leading-6">
							Thank you for choosing {config.TITLE}! To secure
							your account, please use the following One-Time
							Password (OTP) to verify your identity. This OTP is
							valid for the next 10 minutes. If you didn&lsquo;t
							request this, please contact our support team
							immediately.
						</Text>
						<Text className="text-black text-[14px] leading-6">
							Your OTP is: <strong>{otp}</strong>
						</Text>
						<Text className="text-black text-[14px] leading-6">
							Please enter this code in the verification field on
							the {config.TITLE} website. Do not share this OTP
							with anyone.
						</Text>
						<Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
						<Text className="text-[#666666] text-[12px] leading-6">
							For security concerns or if you didn&lsquo;t request
							this OTP, please contact our support team at [
							{config.EMAIL_COMPLAINTS}] or ignore this email.
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	)
}

export const OTPEmailHTML = async ({ username, otp }: BetterAuthOTPProps) => {
	return await render(
		<OTPEmail
			username={username}
			otp={otp}
		/>
	)
}
