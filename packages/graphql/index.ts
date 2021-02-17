import { ApolloServer, gql } from "apollo-server-express";
import { CoronaAPI } from "./sources/CoronaAPI";

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => "Hello world!",
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
    }
});

export default server;
