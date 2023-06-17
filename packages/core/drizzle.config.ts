import type { Config } from "drizzle-kit";

export default {
  schema: "./src/sql/schema.ts",
  out: "./migrations",
} satisfies Config;
