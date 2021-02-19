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

    const pop = data.getReport.country.population;
    const deaths = data.getReport.deaths[data.getReport.deaths.length - 1];
    const confirmed = data.getReport.confirmed[data.getReport.confirmed.length - 1];

    const deathPer100K = Math.round(deaths / (pop / 100000));
    const deathRatePerConfirmed = (deaths / confirmed) * 100;
    const populationCaseRate = (confirmed / pop) * 100;

    return (
        <div className={"card mb-3"}>
            <div className="card-header">{data.getReport.name}</div>
            <div className="card-body">
                <p>Population {pop.toLocaleString("sv-se")}</p>
                <p>
                    Deaths: <strong>{deaths.toLocaleString("sv-se")} deaths</strong> ({deathPer100K} / 100K) - CFR:{" "}
                    {deathRatePerConfirmed.toFixed(2)}%
                </p>
                <p>
                    Cases: <strong>{confirmed.toLocaleString("sv-se")} confirmed cases</strong> (
                    {populationCaseRate.toFixed(2)}% of pop.)
                </p>
            </div>
            <div className="card-footer">
                <span className={"text-muted"}>
                    Last updated: {data.getReport.labels[data.getReport.labels.length - 1]}
                </span>
            </div>
        </div>
    );
};
