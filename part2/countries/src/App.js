import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [name, setName] = useState('');

  const handleSearchChange = (event) => {
    let name = event.target.value;
    setName(name);

    axios
      .get(`https://restcountries.eu/rest/v2/name/${name}`)
      .then(response => {
        if (response.data.length === 1){
          setCurrentCountry(countries[0]);
        }else{
          setCurrentCountry(null);
        }
        setCountries(response.data)
      })
      .catch(error => setCountries([]));
  }

  const showOneCountry = () => {
    if (currentCountry === null){
      return <div>Country not selected</div>
    }
    return (
    <div>
      <h2>{currentCountry.name}</h2>
      <div>
        <span>Capital {currentCountry.capital}</span>
        <br/>
        <span>Population {currentCountry.population}</span>
        <h3>Languages</h3>
        <ul>
          {currentCountry.languages.map( language => <li key={language.iso639_2}>{language.name} ({language.nativeName})</li>)}
        </ul>
        <img src={currentCountry.flag} width="10%" alt={`Flag of ${currentCountry.name}`}/>
      </div>
    </div>
    )
  }

  const handleShowCountry = (country) => (event) => {
    setCurrentCountry(country);
  }

  const countryItem = (country) => (
    <li key={country.alpha3Code}>
      <span>{country.name}</span>
      <span>
        <button onClick={handleShowCountry(country)}>show</button>
      </span>
    </li>
  )
  
  const showCountryList = () => (
    <div>
      <ul>
        {countries.map(countryItem)}
      </ul>
    </div>
  )

  const showData = () => {
    if (countries.length === 0) {
      return <div>No country found for name "{name}"</div>
    }else if (countries.length === 1){
      return <div></div>
    }else if (countries.length <= 10){
      return showCountryList();
    }else{
      return <div>Too many matches, specify another filter</div>
    }
  }

  return (
    <div>
      <div>
        <form>
          <input
            value={name}
            onChange={handleSearchChange}
          />
        </form>
      </div>
      <div>
        {showData()}
      </div>
      <div>
        <h1>Country info</h1>
        <div>
          {showOneCountry()}
        </div>
      </div>
    </div>
  );
}

export default App;
