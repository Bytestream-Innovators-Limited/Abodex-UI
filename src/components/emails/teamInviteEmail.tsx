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

export const OrganizationTeamInvite = ({
	email,
	invitedByUsername,
	invitedByEmail,
	teamName,
	inviteLink,
}: OrganizationTeamInviteProps) => {
	const previewText = `You've been invited to join ${teamName}`

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans px-2">
					<Container className="border border-solid border-[#eaeaea] rounded my-10 mx-auto p-5 max-w-[465px]">
						<Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
							Join Team Invitation
						</Heading>
						<Text className="text-black text-[14px] leading-6">
							Hello {email},
						</Text>
						<Text className="text-black text-[14px] leading-6">
							You have been invited to join the{" "}
							<strong>{teamName}</strong> team by{" "}
							<strong>{invitedByUsername}</strong> (
							{invitedByEmail}).
						</Text>
						<Text className="text-black text-[14px] leading-6">
							Accept this invitation to become a member of the
							organization and start collaborating with your team.
						</Text>
						<Section className="text-center mt-8 mb-8">
							<Button
								className="bg-[#000000] rounded-xl text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
								href={inviteLink}
							>
								Join Team
							</Button>
						</Section>
						<Text className="text-black text-[14px] leading-6">
							Or copy and paste this URL into your browser:{" "}
							<Link
								href={inviteLink}
								className="text-blue-600 no-underline"
							>
								{inviteLink}
							</Link>
						</Text>
						<Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
						<Text className="text-[#666666] text-[12px] leading-6">
							<strong>What happens next?</strong> If you accept
							this invitation, you&lsquo;ll be added to the {teamName}{" "}
							team and will have access to the organization&lsquo;s
							resources and projects. If you didn&lsquo;t expect this
							invitation, please contact {invitedByUsername} or
							ignore this email.
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

export const OrganizationTeamInviteHTML = async ({
	email,
	invitedByUsername,
	invitedByEmail,
	teamName,
	inviteLink,
}: OrganizationTeamInviteProps) => {
	return await render(
		<OrganizationTeamInvite
			email={email}
			invitedByUsername={invitedByUsername}
			invitedByEmail={invitedByEmail}
			teamName={teamName}
			inviteLink={inviteLink}
		/>
	)
}
