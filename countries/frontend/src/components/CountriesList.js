import React from "react";

const CountriesList = ({filter, countries, limit, showCountry}) => {
    const countryItem = (country) => <li key={country.alpha3Code}>
        <span>{country.name}</span>
        <span>
            <button onClick={(e) => showCountry(country)}>Show</button>
        </span>
    </li>;

    const showCountryList = () => (
        <div>
            <ul>
            {countries.map(countryItem)}
            </ul>
        </div>
    );

    const showData = () => {
        if (filter !== ""){
            if (countries.length === 0) {
                return <div>No country found for name "{filter}"</div>;
            } else if (countries.length <= limit) {
                return showCountryList();
            }
        }
        return <div>Too many matches, specify another filter</div>
    }

    return showData();
}


CountriesList.defaultProps = {
    limit: 10
}

export default CountriesList;