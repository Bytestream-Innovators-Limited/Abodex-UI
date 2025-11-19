interface RentExpiringSoonProps {
    tenantName: string
    propertyName: string
    expirationDate: string // e.g., "November 17, 2025"
    timeFrame: "3 weeks" | "1 month" | "2 months" | "3 months" // Indicates whether expiration is in 3 weeks or 3 months
    renewLink: string // e.g., "https://yourapp.com/tenant/renew"
}

interface RentPaymentConfirmationProps {
    tenantName: string
    propertyName: string
    startDate: string // e.g., "October 27, 2025"
    endDate: string // e.g., "October 27, 2026"
    agreementLink: string // e.g., "https://yourapp.com/agreement/property-slug"
}

interface RentExpiredProps {
    tenantName: string
    propertyName: string
    expirationDate: string // e.g., "October 27, 2025"
    renewLink: string // e.g., "https://yourapp.com/tenant/renew"
}

interface RentIncrementNotificationProps {
    tenantName: string
    propertyName: string
    currentRentAmount: string // e.g., "$1,000/month"
    newRentAmount: string // e.g., "$1,200/month"
    effectiveDate: string // e.g., "January 1, 2026"
    gracePeriod: string // e.g., "3 months"
    confirmLink: string // e.g., "https://yourapp.com/tenant/rent-increment/confirm?token=abc123"
    disputeLink: string // e.g., "https://yourapp.com/tenant/rent-increment/dispute?token=abc123"
}