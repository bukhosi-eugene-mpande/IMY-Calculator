import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	dbCredentials: { url: "postgres://root:mysecretpassword@localhost:5432/local" },
	verbose: true,
	strict: true,
	dialect: 'postgresql'
});
