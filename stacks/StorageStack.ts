import { StackContext, RDS, Bucket } from "sst/constructs";
import * as rds from "aws-cdk-lib/aws-rds";
import * as s3 from "aws-cdk-lib/aws-s3";
import { RemovalPolicy } from "aws-cdk-lib/core";

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
    defaultDatabaseName: "my-database",
    scaling: app.stage === "prod" ? prodConfig : devConfig,
  });

  const bucket = new s3.Bucket(stack, "Bucket", {
    accessControl: s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
    autoDeleteObjects: app.stage !== "prod",
    blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    bucketName: app.logicalPrefixedName("my-bucket"),
    encryption: s3.BucketEncryption.S3_MANAGED,
    enforceSSL: true,
    removalPolicy:
      app.stage === "prod" ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
    versioned: true,
  });

  return { rds, bucket };
}
