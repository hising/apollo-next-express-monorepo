import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Layout from "../components/Layout";
import gql from "graphql-tag";
import { withApollo } from "../apollo/apollo";
import { Report } from "../components/Report";

const QUERY = gql`
    query GetUser {
        getUser {
            name {
                first
                last
            }
            location {
                city
                postcode
            }
            phone
            cell
            picture {
                large
                medium
                thumbnail
            }
        }
        getReport(name: "Norway") {
            name
            labels
            confirmed
            deaths
            country {
                population
            }
        }
    }
`;

const SSR = () => {
    const { data, loading, error, refetch } = useQuery(QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Layout>
            <h1>This should be rendered on server side</h1>
            <div>
                <code>getUser</code>: {data.getUser.name.first} {data.getUser.name.last}
            </div>

            <Report country={"Norway"} />
            <Report country={"Sweden"} />
            <Report country={"Finland"} />
            <Report country={"Denmark"} />
            <Report country={"Iceland"} />
            <Report country={"Brazil"} />

            <button onClick={() => refetch()}>Refetch</button>
        </Layout>
    );
};

export default withApollo({ ssr: true })(SSR);
