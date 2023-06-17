import { StackContext, RDS } from "sst/constructs";
import * as rds from "aws-cdk-lib/aws-rds";

const prodConfig = {
  autoPause: false,
  minCapacity: "ACU_8" as keyof typeof rds.AuroraCapacityUnit,
  maxCapacity: "ACU_64" as keyof typeof rds.AuroraCapacityUnit,
};
const devConfig = {
  autoPause: true,
  minCapacity: "ACU_2" as keyof typeof rds.AuroraCapacityUnit,
  maxCapacity: "ACU_2" as keyof typeof rds.AuroraCapacityUnit,
};

export function StorageStack({ stack, app }: StackContext) {
  const rds = new RDS(stack, "Database", {
    engine: "postgresql11.13",
    defaultDatabaseName: "my_database",
    scaling: app.stage === "prod" ? prodConfig : devConfig,
  });

  return rds;
}
