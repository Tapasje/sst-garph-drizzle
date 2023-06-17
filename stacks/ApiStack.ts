import { StackContext, Api, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack }: StackContext) {
  const rds = use(StorageStack);

  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        bind: [rds],
        environment: {
          STAGE: stack.stage,
        },
        copyFiles: [
          {
            from: "packages/core/migrations",
            to: "migrations",
          },
        ],
      },
    },
    routes: {
      "POST /graphql": {
        type: "graphql",
        function: "packages/functions/src/graphql.handler",
      },
      "GET /migrate": "packages/functions/src/migrator.handler",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return api;
}
