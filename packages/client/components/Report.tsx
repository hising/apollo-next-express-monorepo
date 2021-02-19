import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const Report = ({ country }) => {
    const QUERY = gql`
    query GetReport {
        getReport(name: "${country}") {
            name
            labels
            confirmed
            deaths
            country {
                population
            }
        }
    }`;

    const { data, loading, error, refetch } = useQuery(QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <code>getReport(name: "{country}")</code>
            <h3>
                {data.getReport.name} - population {data.getReport.country.population}
            </h3>
            <p>Deaths: {data.getReport.deaths[data.getReport.deaths.length - 1]} deaths</p>
            <p>Cases: {data.getReport.confirmed[data.getReport.confirmed.length - 1]} confirmed cases</p>
            <p>Last updated: {data.getReport.labels[data.getReport.labels.length - 1]}</p>
        </div>
    );
};
