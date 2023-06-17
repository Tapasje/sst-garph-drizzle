import { SSTConfig } from "sst";
import { StorageStack } from "./stacks/StorageStack";
import { ApiStack } from "./stacks/ApiStack";
import { WebStack } from "./stacks/WebStack";

export default {
	config(_input) {
		return {
			name: "sst-garph-drizzle",
			region: "eu-central-1"
		};
	},
	stacks(app) {
		app.stack(StorageStack).stack(ApiStack).stack(WebStack);
	}
} satisfies SSTConfig;
