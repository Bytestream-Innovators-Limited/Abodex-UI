import { timestamp } from "drizzle-orm/pg-core";

export const timestamps = {
    createdAt: timestamp('created_at').$onUpdate(() => /* @__PURE__ */ new Date()).$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
    updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
}

export const bookingDate = {
    bookedFor: timestamp('booked_for').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
}