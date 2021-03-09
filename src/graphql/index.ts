import { createClient } from "@urql/preact";

export * from "./types.d";

const client = createClient({
  url: "http://localhost:8080/graphql",
});

export default client;
