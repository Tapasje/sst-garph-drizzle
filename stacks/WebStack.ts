import { StackContext, SvelteKitSite, use } from "sst/constructs";
import { ApiStack } from "./ApiStack";

export function WebStack({ stack }: StackContext) {
  const api = use(ApiStack);

  const site = new SvelteKitSite(stack, "Site", {
    path: "packages/web",
    environment: {
      VITE_API_URL: api.url,
    },
  });

  stack.addOutputs({
    URL: site.url || "localhost",
  });
}
