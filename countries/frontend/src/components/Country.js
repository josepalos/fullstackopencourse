import React from "react";

const Languages = (languages) => <>
    <h3>Languages</h3>
    <ul>
        {languages.map( (language) =>
            <li key={language.iso639_2}>{language.name} ({language.nativeName})</li>)}
    </ul>
</>;

const Country = ({ country }) => {
    if(country === null || !country.found){
        return null;
    }
    console.log(country);

    return <div>
        <h2>{country.data.name}</h2>
        <div>
            <span>Capital {country.data.capital}</span>
            <br />
            <span>Population {country.data.population}</span>
            {/* <Languages languages={country.languages} /> */}
            <p/>
            <img src={country.data.flag} width="10%" alt={`Flag of ${country.data.name}`}/>
        </div>
    </div>
}

export default Country;