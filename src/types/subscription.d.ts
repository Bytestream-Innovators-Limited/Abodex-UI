interface SubscriptionConfirmationProps {
    username: string
    planName: string
    startDate: string // e.g., "October 27, 2025"
    dashboardLink: string // e.g., "https://yourapp.com/dashboard"
}

interface SubscriptionExpiringSoonProps {
    username: string
    planName: string
    expirationDate: string // e.g., "November 3, 2025"
    renewLink: string // e.g., "https://yourapp.com/subscription/renew"
}

interface SubscriptionExpiredProps {
    username: string
    planName: string
    expirationDate: string // e.g., "October 27, 2025"
    renewLink: string // e.g., "https://yourapp.com/subscription/renew"
}

interface ResubscriptionReminderProps {
    username: string
    planName: string
    expirationDate: string // e.g., "October 27, 2025"
    renewLink: string // e.g., "https://yourapp.com/subscription/renew"
}