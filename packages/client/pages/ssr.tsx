import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Layout from "../components/Layout";
import gql from "graphql-tag";
import { withApollo } from "../apollo/apollo";

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

            <div>
                <code>getReport(name: "Norway")</code>
                <h3>
                    {data.getReport.name} - population {data.getReport.country.population}
                </h3>
                <p>Deaths: {data.getReport.deaths[data.getReport.deaths.length - 1]} deaths</p>
                <p>Cases: {data.getReport.confirmed[data.getReport.confirmed.length - 1]} confirmed cases</p>
                <p>Last updated: {data.getReport.labels[data.getReport.labels.length - 1]}</p>
            </div>

            <button onClick={() => refetch()}>Refetch</button>
        </Layout>
    );
};

export default withApollo({ ssr: true })(SSR);
