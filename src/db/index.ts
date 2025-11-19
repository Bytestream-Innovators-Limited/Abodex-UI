import { config } from "@/config";
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "@neondatabase/serverless"
import * as schemas from "@/db/models";

const pool = new Pool({ connectionString: config.DATABASE_URL! })
const db = drizzle(pool, {
    schema: schemas,
    casing: "snake_case", // Ensures `usersTable` → `users` in DB
    logger: config.NODE_ENV === "development" ? true : false,
})

export default db
export type DbConfig = typeof db