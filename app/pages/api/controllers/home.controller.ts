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

    return Object.values(continentCountResult);
};

// TODO: Get languages spoken general
export const getLanguagesSpoken = () => {
    const languagesResult = {};

    Object.values(countries).forEach((country) => {
        if(country.languages.length > 0){
            country.languages.forEach(lang => {
                languagesResult[lang]++;
            });
        }
    });

    for(let lang in languagesResult){
        let langCount = 0;

        Object.values(countries).forEach((country) => {
            if(country.languages.includes(lang)){
                langCount++;
                languagesResult[lang] = langCount;
            } 
        });
    };

    return languagesResult;
};

// TODO: GEt languages spoken by region

// TODO: Get countries by language

// TODO: Get countries by continent