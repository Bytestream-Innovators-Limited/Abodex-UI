/**
 * Defines the structure for a single mail attachment.
 * NodeMailer accepts content as a Buffer, Stream, or file path.
 * @property {string} filename - The name of the attachment file.
 * @property {any} [content] - The content of the attachment (string, Buffer, or Stream).
 * @property {string} [path] - The file path on disk for the attachment.
 * @property {string} [contentType] - The MIME type of the attachment (e.g., "application/pdf").
 * @property {string} [cid] - Content-ID for embedding images in HTML (e.g., for inline images).
 */
interface MailAttachment {
    filename: string;
    content?: unknown;
    path?: string;
    contentType?: string;
    cid?: string;
}

/**
 * Defines the structure for a recipient of an email.
 * @property {string} email - The email address of the recipient.
 * @property {string} name - The name of the recipient.
 */
interface Recipient {
    email: string;
    name: string;
}

/**
 * Properties for sending a single email.
 * @property {string} [from] - The sender's email address (defaults to config.FROM_EMAIL if not provided).
 * @property {string} to - The recipient's email address.
 * @property {string} subject - The subject line of the email.
 * @property {string} html - The HTML content of the email.
 * @property {MailAttachment[]} [attachment] - Optional array of attachments.
 */
interface SendMailProps {
    from?: string;
    to: string;
    subject: string;
    html: string;
    attachment?: MailAttachment[];
}

/**
 * Properties for sending bulk emails.
 * @property {string} [from] - The sender's email address (defaults to config.FROM_EMAIL if not provided).
 * @property {string} subject - The subject line of the email.
 * @property {string} html - The HTML content of the email.
 * @property {MailAttachment[]} [attachment] - Optional array of attachments.
 * @property {Recipient[]} recipients - Array of recipient objects.
 */
interface SendBulkMailProps {
    from?: string;
    subject: string;
    html: string;
    attachment?: MailAttachment[];
    recipients: Recipient[];
}