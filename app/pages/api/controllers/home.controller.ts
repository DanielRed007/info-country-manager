import { countries, continents } from "countries-list";

// List of all countries
export const getCountries = () => {
    return Object.values(countries);
};

// Continents listed by total countries
export const getContinents = () => {
    const continentCountResult = {
        AF: { name: "Africa" , total: 0 },
        AN: { name: "Antarctica" , total: 0},
        AS: { name: "Asia" , total: 0},
        EU: { name: "Europe" , total: 0},
        NA: { name: "North America" , total: 0},
        OC: { name: "Oceania" , total: 0},
        SA: { name: "South America" , total: 0}
    };

    Object.values(countries).forEach((country) => {
        continentCountResult[country.continent].total++;  
    });

    return continentCountResult;
};

// TODO: Get countries by language

// TODO: Get countries by continent