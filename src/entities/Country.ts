import { Length } from "class-validator";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Country extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column({ type: "varchar", length: 2, unique: true }) // code pays sur 2 caractères uniquement
	@Length(2, 2)
	code: string;

	@Field()
	@Column({ type: "varchar", length: 150, unique: true }) // choix arbitraire de mettre 150 caractères max pour le nom des pays
	@Length(2, 150)
	name: string;

	@Field()
	@Column({ type: "varchar", length: 2 })
	@Length(2, 2)
	emoji: string; // on utilise une string pour mettre l'emoticon de chaque pays (drapeau)
}

@InputType()
export class NewCountryInput {
	@Field()
	@Length(2, 2, { message: "Le code pays doit contenir 2 caractères" })
	code: string;

	@Field()
	@Length(2, 150, {
		message: "Le nom du pays doit contenir entre 2 et 150 caractères",
	})
	name: string;

	@Field()
	@Length(2, 2, { message: "Un emoji doit être présent" })
	emoji: string; // on utilise une string pour mettre l'emoticon de chaque pays (drapeau)
}
