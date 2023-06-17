import { drizzle } from "drizzle-orm/aws-data-api/pg";
import { RDSData } from "@aws-sdk/client-rds-data";
import { RDS } from "sst/node/rds";
import { migrate as mig } from "drizzle-orm/aws-data-api/pg/migrator";

export const DB = drizzle(new RDSData({}), {
  database: RDS.Database.defaultDatabaseName,
  secretArn: RDS.Database.secretArn,
  resourceArn: RDS.Database.clusterArn,
});

export const migrate = async (path: string) => {
  return mig(DB, { migrationsFolder: path });
};

export * as SQL from "./index";
