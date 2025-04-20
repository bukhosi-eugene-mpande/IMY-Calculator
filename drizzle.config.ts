import { defineConfig } from 'drizzle-kit';
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	dbCredentials: { url: "postgres://root:mysecretpassword@localhost:5432/local" },
	verbose: true,
	strict: true,
	dialect: 'postgresql'
});
