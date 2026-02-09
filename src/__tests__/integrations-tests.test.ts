import assert from "node:assert";
import { ApolloServer } from "@apollo/server";
import { Country } from "../entities/Country";

const typeDefs = `#graphql
  type Country {
    id: ID!,
    name: String!,
    code: String!,
    emoji: String!
  }
  
  type Query {
    countries() : [Country]!
  }
`;

const resolvers = {
	Query: {
		countries: async () => await Country.find(),
	},
};

describe("integration tests for our API", () => {
	it("returns a list of countries ", async () => {
		const serverTest = new ApolloServer({
			// pas réussi à brancher ma db à cette instance de test "ApolloServer" :/
			typeDefs,
			resolvers,
		});

		const response = await serverTest.executeOperation({
			query: "query Countries() { countries() }",
		});

		assert(response.body.kind === "single");
		expect(response.body.singleResult.errors).toBeUndefined();
		expect(response.body.singleResult.data?.hello).toHaveLength(0);
	});
});
