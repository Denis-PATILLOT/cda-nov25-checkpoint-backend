import assert from "node:assert";
import { ApolloServer } from "@apollo/server";
import { Country, NewCountryInput } from "../entities/Country";

const typeDefs = `#graphql
  type Country {
    id: ID!,
    name: String!,
    code: String!,
    emoji: String!
  }

  input NewCountryInput {
	code: String!,
	name: String!,
	emoji: String!
  }
  
  type Query {    # pas de parenthèses après countries !
    countries: [Country]    
  }

  type Mutation {
	createCountry(data: NewCountryInput): Country
  }
 
`;

const resolvers = {
	Query: {
		countries: async () => await Country.find(),
	},
	Mutation: {
		createCountry: async (parent: any, args: any) => {
			const newCountry = new Country();
			Object.assign(newCountry, args.data);
			const { id } = await newCountry.save();
			return Country.findOneBy({ id });
		},
	},
};

describe("integration tests for our API", () => {
	it("returns a list of countries ", async () => {
		const serverTest = new ApolloServer({
			typeDefs,
			resolvers,
		});

		const response = await serverTest.executeOperation({
			query: "query Countries { countries { name id emoji } }",
		});

		assert(response.body.kind === "single");
		expect(response.body.singleResult.errors).toBeUndefined();
		expect(response.body.singleResult.data?.countries).toHaveLength(0); // 0 car on fait un synchronize à true avant la réalisation des tests
	});

	it("creates a new country", async () => {
		const serverTest = new ApolloServer({
			typeDefs,
			resolvers,
		});

		const response = await serverTest.executeOperation({
			query:
				'mutation CreateNewCountry { createCountry(data: {code: "DE", name: "Allemagne", emoji: "🇩🇪"}) { id name code emoji } }',
		});

		assert(response.body.kind === "single");
		expect(response.body.singleResult.errors).toBeUndefined();
		expect(response.body.singleResult.data?.createCountry).toMatchObject({
			code: "DE",
			name: "Allemagne",
			emoji: "🇩🇪",
		}); // 0 car on fait un synchronize à true avant la réalisation des tests
	});

	it("returns a list of countries ", async () => {
		const serverTest = new ApolloServer({
			typeDefs,
			resolvers,
		});

		const response = await serverTest.executeOperation({
			query: "query Countries { countries { name id emoji } }",
		});

		assert(response.body.kind === "single");
		expect(response.body.singleResult.errors).toBeUndefined();
		expect(response.body.singleResult.data?.countries).toHaveLength(1); // 1 car on a crée l'allemagne dans le test précédent !
	});
});
