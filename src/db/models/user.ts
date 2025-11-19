import { index, pgTable, text, timestamp, boolean, integer, numeric } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { timestamps } from "../helpers/timestamp";

// User Table
export const user = pgTable(
    "user",
    {
        id: text("id").primaryKey(),
        name: text("name").notNull(),
        email: text("email").notNull().unique(),
        emailVerified: boolean("email_verified").default(false).notNull(),
        image: text("image").default("https://placehold.co/400"),
        role: text("role"),
        banned: boolean("banned").default(false),
        banReason: text("ban_reason"),
        banExpires: timestamp("ban_expires"),
        twoFactorEnabled: boolean("two_factor_enabled").default(false).notNull(),
        subscribed: boolean("subscribed").default(false),
        ...timestamps,
    },
    (table) => [
        index("user_created_at_idx").on(table.createdAt),
        index("user_email_idx").on(table.email),
    ]
);

// User Relationships
export const userRelations = relations(user, ({ one, many }) => ({
    wallet: one(wallet, {
        fields: [user.id],
        references: [wallet.userId],
    }),
    sessions: many(session),
    accounts: many(account),
    passkeys: many(passkey),
    twoFactors: many(twoFactor),
    memberships: many(member), // Users can have many memberships in organizations
    invitations: many(invitation), // Users can send many invitations
}));

// Session Table
export const session = pgTable(
    "session",
    {
        id: text("id").primaryKey(),
        expiresAt: timestamp("expires_at").notNull(),
        token: text("token").notNull().unique(),
        ipAddress: text("ip_address"),
        userAgent: text("user_agent"),
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        impersonatedBy: text("impersonated_by"),
        activeOrganizationId: text("active_organization_id"),
        ...timestamps,
    },
    (table) => [
        index("session_created_at_idx").on(table.createdAt),
        index("session_user_id_idx").on(table.userId),
        index("session_token_idx").on(table.token),
    ]
);

// Session Relationships
export const sessionRelations = relations(session, ({ one }) => ({
    user: one(user, {
        fields: [session.userId],
        references: [user.id],
    }),
}));

// Account Table
export const account = pgTable(
    "account",
    {
        id: text("id").primaryKey(),
        accountId: text("account_id").notNull(),
        providerId: text("provider_id").notNull(),
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        accessToken: text("access_token"),
        refreshToken: text("refresh_token"),
        idToken: text("id_token"),
        accessTokenExpiresAt: timestamp("access_token_expires_at"),
        refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
        scope: text("scope"),
        password: text("password"),
        ...timestamps,
    },
    (table) => [
        index("account_created_at_idx").on(table.createdAt),
        index("account_user_id_idx").on(table.userId),
        index("account_account_id_idx").on(table.accountId),
    ]
);

// Account Relationships
export const accountRelations = relations(account, ({ one }) => ({
    user: one(user, {
        fields: [account.userId],
        references: [user.id],
    }),
}));

// Verification Table
export const verification = pgTable(
    "verification",
    {
        id: text("id").primaryKey(),
        identifier: text("identifier").notNull(),
        value: text("value").notNull(),
        expiresAt: timestamp("expires_at").notNull(),
        ...timestamps,
    },
    (table) => [
        index("verification_created_at_idx").on(table.createdAt),
        index("verification_identifier_idx").on(table.identifier),
    ]
);

// Passkey Table
export const passkey = pgTable(
    "passkey",
    {
        id: text("id").primaryKey(),
        name: text("name"),
        publicKey: text("public_key").notNull(),
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        credentialID: text("credential_id").notNull(),
        counter: integer("counter").notNull(),
        deviceType: text("device_type").notNull(),
        backedUp: boolean("backed_up").notNull(),
        transports: text("transports"),
        aaguid: text("aaguid"),
        ...timestamps,
    },
    (table) => [
        index("passkey_created_at_idx").on(table.createdAt),
        index("passkey_user_id_idx").on(table.userId),
        index("passkey_credential_id_idx").on(table.credentialID),
    ]
);

// Passkey Relationships
export const passkeyRelations = relations(passkey, ({ one }) => ({
    user: one(user, {
        fields: [passkey.userId],
        references: [user.id],
    }),
}));

// Organization Table
export const organization = pgTable("organization", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    logo: text("logo"),
    createdAt: timestamp("created_at").notNull(),
    metadata: text("metadata"),
});

// Organization Relationships
export const organizationRelations = relations(organization, ({ many }) => ({
    members: many(member),
    invitations: many(invitation),
}));

// Member Table
export const member = pgTable("member", {
    id: text("id").primaryKey(),
    organizationId: text("organization_id")
        .notNull()
        .references(() => organization.id, { onDelete: "cascade" }),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    role: text("role").default("member").notNull(),
    createdAt: timestamp("created_at").notNull(),
});

// Member Relationships
export const memberRelations = relations(member, ({ one }) => ({
    organization: one(organization, {
        fields: [member.organizationId],
        references: [organization.id],
    }),
    user: one(user, {
        fields: [member.userId],
        references: [user.id],
    }),
}));

// Invitation Table
export const invitation = pgTable("invitation", {
    id: text("id").primaryKey(),
    organizationId: text("organization_id")
        .notNull()
        .references(() => organization.id, { onDelete: "cascade" }),
    email: text("email").notNull(),
    role: text("role"),
    status: text("status").default("pending").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    inviterId: text("inviter_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
});

// Invitation Relationships
export const invitationRelations = relations(invitation, ({ one }) => ({
    organization: one(organization, {
        fields: [invitation.organizationId],
        references: [organization.id],
    }),
    inviter: one(user, {
        fields: [invitation.inviterId],
        references: [user.id],
    }),
}));

// TwoFactor Table
export const twoFactor = pgTable(
    "two_factor",
    {
        id: text("id").primaryKey(),
        secret: text("secret").notNull(),
        backupCodes: text("backup_codes").notNull(),
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
    },
    (table) => [index("two_factor_user_id_idx").on(table.userId)]
);

// TwoFactor Relationships
export const twoFactorRelations = relations(twoFactor, ({ one }) => ({
    user: one(user, {
        fields: [twoFactor.userId],
        references: [user.id],
    }),
}));

// Wallet Table
export const wallet = pgTable(
    "wallet",
    {
        id: text("id").primaryKey(),
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        holding: numeric("holding", { precision: 10, scale: 2 }).default("0.00"),
        withdrawn: numeric("withdrawn", { precision: 10, scale: 2 }).default("0.00"),
        ...timestamps,
    },
    (table) => [
        index("wallet_created_at_idx").on(table.createdAt),
        index("wallet_user_id_idx").on(table.userId),
    ]
);

// Wallet Relationships
export const walletRelations = relations(wallet, ({ one }) => ({
    user: one(user, {
        fields: [wallet.userId],
        references: [user.id],
    }),
}));