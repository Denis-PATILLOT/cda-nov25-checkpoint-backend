import { DataSource } from "typeorm";

export default new DataSource({
	type: "sqlite",
	database: "src/db/checkpoint2_backend.sqlite",
	entities: ["src/entities/*.ts"],
	synchronize: true,
});
