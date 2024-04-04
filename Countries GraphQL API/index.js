import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { continents, countries, languages } from "./data.js";

const typeDefs = `#graphql
  type Country {
    id: ID!
    name: String!
    code: String!
    continent_code: String!
    language: Language
    continent: Continent
  }

  type Language {
    id: ID!
    name: String!
    code: String!
    continent_code: String!
    country: Country
    continent: Continent
  }

  type Continent {
    id: ID!
    name: String!
    code: String!
    country: Country
    language: Language
   }

  type Query {
    countries: [Country]
    country(code: String!) : Country

    languages: [Language]
    language(code: String!) : Language

    continents: [Continent]
    continent(code: String!) : Continent
  }
`;

const resolvers = {
  Query: {
    countries: () => countries,
    country: (_, args) => {
      const country = countries.find(
        (c) => c.code.toString() === args.code.toString()
      );
      return country;
    },

    languages: () => languages,
    language: (_, args) => {
      const language = languages.find(
        (c) => c.code.toString() === args.code.toString()
      );
      return language;
    },

    continents: () => continents,
    continent: (_, args) => {
      const continent = continents.find(
        (c) => c.code.toString() === args.code.toString()
      );
      return continent;
    },
  },

  Country: {
    language: (parent) => {
      const result = languages.find((l) => l.code === parent.code);
      return result;
    },
    continent: (parent) => {
      const result = continents.find((l) => l.code === parent.continent_code);
      return result;
    },
  },

  Language: {
    country: (parent) => {
      const result = countries.find((l) => l.code === parent.code);
      return result;
    },
    continent: (parent) => {
      const result = continents.find((l) => l.code === parent.continent_code);
      return result;
    },
  },

  Continent: {
    country: (parent) => {
      const result = countries.find((l) => l.continent_code === parent.code);
      return result;
    },
    language: (parent) => {
      const result = languages.find((l) => l.continent_code === parent.code);
      return result;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
