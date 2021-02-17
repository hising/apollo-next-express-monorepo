import { ApolloServer, gql } from "apollo-server-express";
import { CoronaAPI } from "./sources/CoronaAPI";

const typeDefs = gql`
    type Query {
        hello: String
        report: String
    }

    type Country {
        population: string
        coord: string
        geometry: string
    }

    type Report {
        name: String
        labels: [String]
        confirmed: [Int]
        deaths: [Int]
        recovered: [Int]
        country: Country
    }
`;

const resolvers = {
    Query: {
        hello: () => "Hello worsssld!",
        report: async (_source, { report }, { dataSources }) => {
            return dataSources.coronaAPI.getReport(report);
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            coronaAPI: new CoronaAPI()
        };
    },
    context: () => {
        return {
            foo: "bar"
        };
    }
});

export default server;
