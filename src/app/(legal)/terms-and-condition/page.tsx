/* eslint-disable react/no-unescaped-entities */
// app/terms/page.tsx

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { config } from "@/config"

export const metadata = {
	title: "Terms and Conditions",
	description:
		"Abodex's terms and conditions outline the rules and regulations for using our estate management platform.",
}

export default function TermsAndConditions() {
	return (
		<div className="container mx-auto py-16 lg:py-20">
			<div className="text-center mb-8 ">
				<h1 className="text-2xl lg:text-4xl font-bold mb-4">
					Terms and Conditions
				</h1>
				<p className="text-md lg:text-xl text-muted-foreground">
					Last updated:{" "}
					{new Date().toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</p>
			</div>

			<div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 md:p-8">
				<Accordion
					type="single"
					collapsible
					defaultValue="acceptance-of-terms"
					className="w-full"
				>
					<AccordionItem value="acceptance-of-terms">
						<AccordionTrigger>Acceptance of Terms</AccordionTrigger>
						<AccordionContent>
							<p>
								Welcome to Abodex. These Terms and Conditions
								("Terms") govern your use of our estate
								management platform, including our website,
								services, and applications (the "Service").
							</p>
							<p className="mt-2">
								By accessing or using Abodex, you agree to be
								bound by these Terms. If you disagree with any
								part of these terms, then you may not access the
								Service.
							</p>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="account-registration">
						<AccordionTrigger>
							Account Registration and Security
						</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-4">
								<div>
									<h3 className="text-lg font-semibold mb-2">
										Eligibility
									</h3>
									<p className="text-muted-foreground">
										You must be at least 18 years old and
										have the legal capacity to enter into
										binding contracts to use our platform.
										By registering, you represent and
										warrant that you meet these requirements
										and have the authority to manage the
										properties and estates you add to the
										platform.
									</p>
								</div>
								<div>
									<h3 className="text-lg font-semibold mb-2">
										Account Security
									</h3>
									<p className="text-muted-foreground">
										You are responsible for safeguarding the
										password that you use to access the
										Service and for any activities or
										actions under your password. You agree
										not to disclose your password to any
										third party. You must notify us
										immediately upon becoming aware of any
										breach of security or unauthorized use
										of your account.
									</p>
								</div>
								<div>
									<h3 className="text-lg font-semibold mb-2">
										Account Verification
									</h3>
									<p className="text-muted-foreground">
										We reserve the right to verify your
										identity and may require documentation
										to confirm ownership or legal authority
										to manage a property or estate listed on
										the platform.
									</p>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="abodex-services">
						<AccordionTrigger>Abodex Services</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-4">
								<div>
									<h3 className="text-lg font-semibold mb-2">
										Rent and Fee Collection
									</h3>
									<p className="text-muted-foreground">
										Abodex provides tools to facilitate
										online payments from tenants, automate
										reminders for due rent, and track all
										income and expenses related to your
										properties. We are not responsible for a
										tenant's failure to pay.
									</p>
								</div>
								<div>
									<h3 className="text-lg font-semibold mb-2">
										Tenancy Management
									</h3>
									<p className="text-muted-foreground">
										You can manage tenant information, lease
										agreements, and communication logs. You
										are responsible for ensuring all tenancy
										agreements comply with local laws and
										regulations.
									</p>
								</div>
								<div>
									<h3 className="text-lg font-semibold mb-2">
										Asset and Estate Management
									</h3>
									<p className="text-muted-foreground">
										Our service allows you to catalog
										assets, store important documents (e.g.,
										deeds, insurance policies), and manage
										property maintenance records.
									</p>
								</div>
								<div>
									<h3 className="text-lg font-semibold mb-2">
										Announcements
									</h3>
									<p className="text-muted-foreground">
										You can use the platform to send
										announcements and notices to your
										tenants or other stakeholders associated
										with your properties.
									</p>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="fees-and-payments">
						<AccordionTrigger>Fees and Payments</AccordionTrigger>
						<AccordionContent>
							<ul className="list-disc list-inside space-y-2 text-muted-foreground">
								<li>
									Abodex may charge a subscription fee for
									access to premium features.
								</li>
								<li>
									A transaction fee may be applied to online
									rent payments processed through our
									platform.
								</li>
								<li>
									All fees are clearly outlined in our pricing
									section and will be disclosed before you are
									charged.
								</li>
								<li>
									We reserve the right to modify our fee
									structure with 30 days' prior notice.
								</li>
							</ul>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="intellectual-property">
						<AccordionTrigger>
							Intellectual Property
						</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-4">
								<div>
									<p className="text-muted-foreground">
										The Service and its original content,
										features, and functionality are and will
										remain the exclusive property of Abodex
										and its licensors. The service is
										protected by copyright, trademark, and
										other laws.
									</p>
								</div>
								<div>
									<h3 className="text-lg font-semibold mb-2">
										User Content
									</h3>
									<p className="text-muted-foreground">
										You retain ownership of any content you
										upload to the Service (e.g., property
										photos, lease documents). By uploading
										content, you grant us a license to use,
										modify, and display it solely for the
										purpose of providing and improving the
										Service.
									</p>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="prohibited-activities">
						<AccordionTrigger>
							Prohibited Activities
						</AccordionTrigger>
						<AccordionContent>
							<ul className="list-disc list-inside space-y-2 text-muted-foreground">
								<li>
									Using the Service for any illegal or
									unauthorized purpose.
								</li>
								<li>
									Violating any local, state, national, or
									international law, including fair housing
									and anti-discrimination laws.
								</li>
								<li>
									Posting fraudulent or misleading property
									listings.
								</li>
								<li>
									Harassing, abusing, or infringing on the
									rights of others, including tenants.
								</li>
								<li>
									Attempting to reverse engineer, hack, or
									disrupt the security or functionality of the
									Service.
								</li>
								<li>
									Using the Service to transmit spam, malware,
									or any malicious code.
								</li>
							</ul>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="disclaimers">
						<AccordionTrigger>Disclaimers</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-4">
								<p className="text-muted-foreground">
									Abodex is a technology platform, not a
									legal, financial, or real estate advisory
									service. We do not provide legal advice, and
									you should consult with a qualified
									professional for any legal or financial
									questions.
								</p>
								<ul className="list-disc list-inside space-y-2 text-muted-foreground">
									<li>
										We are not responsible for disputes
										between landlords and tenants.
									</li>
									<li>
										We do not guarantee the creditworthiness
										or reliability of any tenant.
									</li>
									<li>
										We are not liable for any loss of data
										due to factors outside our reasonable
										control.
									</li>
								</ul>
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="limitation-of-liability">
						<AccordionTrigger>
							Limitation of Liability
						</AccordionTrigger>
						<AccordionContent>
							<p className="text-muted-foreground">
								In no event shall Abodex, its directors,
								employees, partners, agents, suppliers, or
								affiliates be liable for any indirect,
								incidental, special, consequential, or punitive
								damages, including loss of profits, data, use,
								goodwill, or other intangible losses, resulting
								from your use of the Service.
							</p>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="termination">
						<AccordionTrigger>Termination</AccordionTrigger>
						<AccordionContent>
							<p className="text-muted-foreground">
								We may terminate or suspend your account and bar
								access to the Service immediately, without prior
								notice or liability, under our sole discretion,
								for any reason, including if you breach the
								Terms.
							</p>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="governing-law">
						<AccordionTrigger>Governing Law</AccordionTrigger>
						<AccordionContent>
							<p className="text-muted-foreground">
								These Terms shall be interpreted and governed by
								the laws of the jurisdiction in which our
								company is registered, without regard to its
								conflict of law provisions. Any disputes arising
								from these Terms will be resolved in the courts
								of that jurisdiction.
							</p>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="contact-information">
						<AccordionTrigger>Contact Information</AccordionTrigger>
						<AccordionContent>
							<p className="text-muted-foreground mb-4">
								If you have any questions about these Terms and
								Conditions, please contact us:
							</p>
							<div className="space-y-2 font-medium">
								<p>Email: {config.EMAIL_COMPLAINTS}</p>
								<p>Phone: {config.PHONE_NUMBER}</p>
								<p>Address: {config.ADDRESS}</p>
								<p>
									{config.CITY}, {config.STATE}{" "}
									{config.ZIP_CODE}
								</p>
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	)
}
