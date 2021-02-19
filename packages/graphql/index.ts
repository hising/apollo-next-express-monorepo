import { ApolloServer, gql } from "apollo-server-express";
import { CoronaAPI } from "./sources/CoronaAPI";

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

const resolvers = {
    Query: {
        books: () => books,
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

export default server;
