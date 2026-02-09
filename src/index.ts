import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import db from "./db/index";
import env from "./env";
import CountryResolver from "./resolvers/CountryResolver";

buildSchema({ resolvers: [CountryResolver] }).then((schema) => {
	const server = new ApolloServer({ schema });
	startStandaloneServer(server, {
		listen: { port: env.GRAPHQL_SERVER_PORT },
	}).then(({ url }) => {
		db.initialize();
		console.log(`graphql server ready on ${url}`);
	});
});
