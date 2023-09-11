import { StackContext, SvelteKitSite, use } from "sst/constructs";
import { ApiStack } from "./ApiStack";
import { StorageStack } from "./StorageStack";

export function WebStack({ stack, app }: StackContext) {
  const { api } = use(ApiStack);
  const { bucket } = use(StorageStack);

  const site = new SvelteKitSite(stack, "Site", {
    path: "packages/web",
    environment: {
      VITE_API_URL: api.url,
      VITE_BUCKET_NAME: bucket.bucketName,
      VITE_REGION: app.region,
    },
  });

  stack.addOutputs({
    URL: site.url || "localhost",
  });
}
