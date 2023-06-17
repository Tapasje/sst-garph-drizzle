import { g, InferResolvers, buildSchema } from "garph";
import { YogaInitialContext } from "graphql-yoga";
import { GraphQLHandler } from "sst/node/graphql";

const queryType = g.type("Query", {
  greet: g
    .string()
    .args({
      name: g.string().optional().default("Max"),
    })
    .description("Greets a person"),
});

const resolvers: InferResolvers<
  { Query: typeof queryType },
  { context: YogaInitialContext }
> = {
  Query: {
    greet: (parent, args, context, info) => `Hello, ${args.name}`,
  },
};

const schema = buildSchema({ g, resolvers });
export const handler = GraphQLHandler({ schema });
