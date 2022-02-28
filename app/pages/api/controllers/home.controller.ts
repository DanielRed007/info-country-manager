import { countries, continents, languages } from "countries-list";

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

    let labelsData = Object.values(continentCountResult).map(region => region.name);
    let dataSets = Object.values(continentCountResult).map(region => region.total);

    let doughnutData = {
        labels: labelsData,
        datasets: [{
            label: "Continents Info",
            data: dataSets,
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(153, 102, 255, 0.5)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 2,
        }]
    };

    return doughnutData;
};

// TODO: Get languages spoken general
export const getSpokenLanguages = () => {
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

    const spokenLanguages = Object.entries(languagesResult).filter((lang) => lang[1] > 7);

    const rawLanguages = Object.entries(languages)
        .filter(language => spokenLanguages.some(spk => spk[0] === language[0]))
        .map(rawLang => {
            const lang = { 
                name: rawLang[1].name, 
                native: rawLang[1].native , 
                countries: spokenLanguages.find(lang => lang[0] === rawLang[0])[1]};
            return lang;
        });

    const langLabels = rawLanguages.map(raw => raw.name);
    const langData = rawLanguages.map(raw => raw.countries);

    const barData = {
        labels: langLabels,
        datasets: [
          {
            label: 'Countries',
            data: langData,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: [
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 2,
          }
        ],
    };

    return barData;
};