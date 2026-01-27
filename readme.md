# PART 1 - développements backend (5pts)

Le but de cet exercice est de créer une API GraphQL avec Apollo Server, TypeGraphQL et TypeORM pour enregistrer et lire des pays avec leur code, leur nom et leur emoji.

## Setup

Crée un nouveau projet NodeJS / Typescript. 

Voici les packages dont tu auras besoin pour les premiers développements :
```json
  "dependencies": {
    "@apollo/server": "^5.2.0",
    "class-validator": "^0.14.3",
    "graphql": "^16.12.0",
    "graphql-scalars": "^1.25.0",
    "reflect-metadata": "^0.2.2",
    "sqlite3": "^5.1.7",
    "ts-dotenv": "^0.9.1",
    "ts-node-dev": "^2.0.0",
    "type-graphql": "^2.0.0-rc.2",
    "typeorm": "^0.3.27"
  },
  "devDependencies": {
    "typescript": "^5.6.2",
    "@biomejs/biome": "^2.3.8"
  },
```

## Ecriture de données

Crée une mutation qui prend en paramètres :

- un code (FR, BE, AN, ...)
- un nom (France, Belgique, Andorre, ...)
- un emoji (🇫🇷, 🇧🇪, 🇦🇩, ...)

et qui enregistre cette entrée en BDD.

## Lecture de données

Crée ensuite 2 queries :

- Une qui renvoie la liste de tous les pays
- Une autre qui prend en paramètre le code du pays et qui renvoie le pays en question

# Part 2 - Tests (2pts)

Mets en place [TS-Jest](https://kulshekhar.github.io/ts-jest/docs/getting-started/installation#jest-config-file) sur le projet.

## Tests unitaires

Ecris une fonction qui convertit des degrés Celsius en degrés Fahrenheit et teste-là avec Jest.

## Tests d'intégration

Ecris un test d'intégration qui vérifie que la lecture des pays depuis l'API fonctionne bien.
Si tu as le temps, teste également la mutation qui permet de créer un pays en BDD.

Tip : Ce bout de code pourra t'être utile pour vider la BDD avant chaque test

```ts
// this function removes every record in the database
export async function clearDB() {
  await db.synchronize(true) // db is the typeORM DataSource
}
```