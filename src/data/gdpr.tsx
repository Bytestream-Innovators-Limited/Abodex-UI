/* eslint-disable react/no-unescaped-entities */
// lib/gdpr-content.tsx

import Link from "next/link"
import React from "react"

// We use React.ReactNode for content to allow JSX like <strong> or <a> tags.
export interface GdprSection {
    id: string
    title: string
    content: React.ReactNode
}

export const gdprSections: GdprSection[] = [
    {
        id: "introduction",
        title: "1. Introduction",
        content: (
            <>
                <p>
                    <strong>Abodex Nigeria Limited</strong> ("us", "we", or "our")
                    operates the <strong><Link href="/">Web Application Abodex</Link></strong> (the
                    "Service"). This page informs you of our policies regarding
                    the collection, use, and disclosure of personal data when
                    you use our Service and the choices you have associated with
                    that data.
                </p>
                <p>
                    We use your data to provide and improve the Service. By
                    using the Service, you agree to the collection and use of
                    information in accordance with this policy.
                </p>
            </>
        ),
    },
    {
        id: "data-collection",
        title: "2. Information Collection And Use",
        content: (
            <>
                <p>
                    We collect several different types of information for
                    various purposes to provide and improve our Service to you.
                </p>
                <h4 className="font-semibold mt-4">Types of Data Collected</h4>
                <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>
                        <strong>Personal Data:</strong> While using our Service,
                        we may ask you to provide us with certain personally
                        identifiable information that can be used to contact or
                        identify you ("Personal Data"). Personally identifiable
                        information may include, but is not limited to:
                        <ul className="list-circle list-inside ml-4 mt-1">
                            <li>Email address</li>
                            <li>First name and last name</li>
                            <li>Cookies and Usage Data</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Usage Data:</strong> We may also collect
                        information on how the Service is accessed and used
                        ("Usage Data"). This Usage Data may include information
                        such as your computer's Internet Protocol (IP) address,
                        browser type, browser version, the pages of our Service
                        that you visit, the time and date of your visit, the
                        time spent on those pages, and other diagnostic data.
                    </li>
                </ul>
            </>
        ),
    },
    {
        id: "legal-basis",
        title: "3. Legal Basis for Processing Personal Data under GDPR",
        content: (
            <>
                <p>
                    We may process Personal Data only if we have a lawful basis
                    for doing so under the GDPR. The lawful bases depend on the
                    purposes for which we have collected and are using your
                    Personal Data. Typically, our lawful bases are:
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>
                        <strong>Consent:</strong> You have given us clear
                        consent to process your Personal Data for a specific
                        purpose.
                    </li>
                    <li>
                        <strong>Performance of a Contract:</strong> The
                        processing is necessary to fulfill our obligations under
                        a contract with you (e.g., to provide the Service you've
                        signed up for).
                    </li>
                    <li>
                        <strong>Legal Obligation:</strong> The processing is
                        necessary for us to comply with the law.
                    </li>
                    <li>
                        <strong>Legitimate Interests:</strong> The processing is
                        necessary for our legitimate interests, provided those
                        interests are not overridden by your rights and
                        freedoms. For example, to detect and prevent fraud.
                    </li>
                </ul>
            </>
        ),
    },
    {
        id: "data-retention",
        title: "4. Data Retention",
        content: (
            <>
                <p>
                    <strong>Abodex Nigeria Limited</strong> will retain your
                    Personal Data only for as long as is necessary for the
                    purposes set out in this Privacy Policy. We will retain and
                    use your Personal Data to the extent necessary to comply
                    with our legal obligations (for example, if we are required
                    to retain your data to comply with applicable laws), resolve
                    disputes, and enforce our legal agreements and policies.
                </p>
            </>
        ),
    },
    {
        id: "data-rights",
        title: "5. Your Data Protection Rights under GDPR",
        content: (
            <>
                <p>
                    If you are a resident of the European Economic Area (EEA),
                    you have certain data protection rights.{" "}
                    <strong>Abodex Nigeria Limited</strong> aims to take reasonable
                    steps to allow you to correct, amend, delete, or limit the
                    use of your Personal Data.
                </p>
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>
                        <strong>Access:</strong> Request a copy of your Personal
                        Data.
                    </li>
                    <li>
                        <strong>Rectification:</strong> Request correction of
                        any inaccurate Personal Data.
                    </li>
                    <li>
                        <strong>Erasure:</strong> Request the deletion of your
                        Personal Data.
                    </li>
                    <li>
                        <strong>Restrict Processing:</strong> Request that we
                        restrict the processing of your Personal Data.
                    </li>
                    <li>
                        <strong>Data Portability:</strong> Request to receive
                        your Personal Data in a structured, machine-readable
                        format.
                    </li>
                    <li>
                        <strong>Object:</strong> Object to the processing of
                        your Personal Data.
                    </li>
                </ul>
            </>
        ),
    },
    {
        id: "links-to-other-sites",
        title: "6. Links To Other Sites",
        content: (
            <>
                <p>
                    Our Service may contain links to other sites that are not
                    operated by us. If you click on a third-party link, you will
                    be directed to that third party's site. We strongly advise
                    you to review the Privacy Policy of every site you visit.
                </p>
                <p>
                    We have no control over and assume no responsibility for the
                    content, privacy policies, or practices of any third-party
                    sites or services.
                </p>
            </>
        ),
    },
    {
        id: "changes-to-policy",
        title: "7. Changes To This Privacy Policy",
        content: (
            <>
                <p>
                    We may update our Privacy Policy from time to time. We will
                    notify you of any changes by posting the new Privacy Policy
                    on this page and updating the "Last updated" date at the
                    bottom.
                </p>
                <p>
                    You are advised to review this Privacy Policy periodically
                    for any changes. Changes to this Privacy Policy are
                    effective when they are posted on this page.
                </p>
            </>
        ),
    },
    {
        id: "contact-us",
        title: "8. Contact Us",
        content: (
            <>
                <p>
                    If you have any questions about this Privacy Policy, please
                    contact us:
                </p>
                <ul className="list-none space-y-1 mt-2">
                    <li>
                        By email:{" "}
                        <Link
                            href="mailto:contact@yourcompany.com"
                            className="text-primary hover:underline"
                        >
                            hello@abodex.com.ng
                        </Link>
                    </li>
                    <li>
                        By visiting this page on our website:{" "}
                        <Link
                            href="/contact"
                            className="text-primary hover:underline"
                        >
                            https://abodex.com.ng/contact
                        </Link>
                    </li>
                    <li>
                        By mail: <br />
                        Abodex Nigeria Limited
                        <br />
                        20 Market Road
                        <br />
                        Port Harcourt, Rivers State
                        <br />
                        Nigeria
                    </li>
                </ul>
            </>
        ),
    },
]
