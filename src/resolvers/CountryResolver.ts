import { GraphQLError } from "graphql/error";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Country, NewCountryInput } from "../entities/Country";

@Resolver()
export default class CountryResolver {
	// récupérer tous les pays
	@Query(() => [Country])
	async countries() {
		const countries = await Country.find();
		return countries;
	}

	// récupérer un pays via un param 'code'
	@Query(() => Country) // on met { nullable :true } car on peut avoir aucun résultat si pas de corrrespondance }
	async country(@Arg("code", () => String) code: string) {
		const country = await Country.findOneBy({ code: code.toUpperCase() }); // j'ai utillisé la méthode toUppercase()) si on saisit un code en minuscule en param !

		if (!country) {
			throw new GraphQLError("Country not found", {
				extensions: { code: "Not found", http: { status: 404 } },
			});
		}
		return country;
	}

	// création d'un nouveau pays
	@Mutation(() => Country)
	async createCountry(
		@Arg("data", () => NewCountryInput, { validate: true })
		data: NewCountryInput,
	) {
		const newCountry = new Country();
		Object.assign(newCountry, data);
		const { id } = await newCountry.save();
		return Country.findOneBy({ id });
	}
}
