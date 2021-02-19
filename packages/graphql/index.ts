import { ApolloServer, gql } from "apollo-server-express";
import { CoronaAPI } from "./sources/CoronaAPI";
import { RandomUser } from "./sources/RandomUser";

interface MyDataSources {
    RandomUser: RandomUser;
}

const typeDefs = gql`
    type Book {
        title: String
        author: String
    }

    type Name {
        title: String
        first: String
        last: String
    }

    type Location {
        street: String
        city: String
        state: String
        postcode: String
    }

    type Picture {
        large: String
        medium: String
        thumbnail: String
    }

    type User {
        gender: String
        name: Name
        location: Location
        email: String
        phone: String
        cell: String
        picture: Picture
        nat: String
    }

    type Country {
        population: Int
        coord: String
        geometry: String
    }

    type Report {
        name: String
        labels: [String]
        confirmed: [Int]
        deaths: [Int]
        recovered: [Int]
        country: Country
    }

    type Query {
        books: [Book]
        getUser(gender: String): User
        getUsers(people: Int, gender: String): [User]
        getReport(name: String): Report
    }
`;

const books = [
    {
        title: "The Awakening",
        author: "Kate Chopin"
    },
    {
        title: "City of Glass",
        author: "Paul Auster"
    }
];

const resolvers = {
    Query: {
        books: () => books,
        getUser: async (_, { gender }, { dataSources }) => dataSources.RandomUser.getUser(gender),
        getUsers: async (_, { people, gender }, { dataSources }) => dataSources.RandomUser.getUsers(people, gender),
        getReport: async (_, { name }, { dataSources }) => dataSources.coronaApi.getReport(name)
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: (): any => ({
        RandomUser: new RandomUser(),
        coronaApi: new CoronaAPI()
    })
});

export default server;
