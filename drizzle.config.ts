import { config } from '@/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './drizzle',
    schema: './src/db/models',
    dialect: 'postgresql',
    verbose: true,
    strict: false,
    casing: "snake_case",
    dbCredentials: {
        url: config.DATABASE_URL!,
    },
});
