import { migrate } from "@sst-garph-drizzle/core/sql";
import { ApiHandler } from "sst/node/api";

export const handler = ApiHandler(async (_evt) => {
	const pathToMigrations = process.env.IS_LOCAL ? "packages/core/migrations" : "migrations";

	await migrate(pathToMigrations);

	return {
		body: "Migrated!"
	};
});
