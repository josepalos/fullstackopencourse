import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountriesList from "./components/CountriesList";
import Country from "./components/Country";


const useField = (type, onChange) => {
  const [value, setValue] = useState("");

  const internalOnChange = (event) => {
    event.preventDefault();
    setValue(event.target.value);

    if(onChange !== undefined)
      onChange(event.target.value);
  };

  const asInput = () => <input type={type} value={value} onChange={internalOnChange} />

  return {
    value,
    asInput
  };
}


const findCountries = async (partialName) => {
  if(partialName === "") return null;

  try {
    const matches = await axios.get(`https://restcountries.com/v2/name/${partialName}`);
    if(matches.data.status === 404){
      return null;
    }

    return matches.data;
  } catch (err) {
    console.error("Error requesting data for ", partialName);
  }

  return null;
}

const getCountryData = async (name) => {
  if(name === "") return null;
  try {
    const match = await axios.get(`https://restcountries.com/v2/name/${name}?fullText=true`);
    if (match.data.status === 404){ 
      return null;
    }

    return match;
  } catch(err) {
    console.error("Error requesting data for country ", name);
  }

  return null;
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const f = async () => {
      let data = await getCountryData(name);
      if (data !== null){
        data = data.data[0];
      }

      setCountry({
        found: data !== null,
        data: data
      });
    };
    f();
  }, [name]);

  return country;
}

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [name, setName] = useState("");
  const currentCountry = useCountry(name);

  const fetch = (value) => {
    const countryName = value;
    
    const search = async () => {
      const countries = await findCountries(countryName);
      if(countries === null){
        setCountries([]);
      }else{
        setCountries(countries);
      }
    }
    search();
    setFilter(countryName);
  }
  const nameInput = useField("text", fetch);


  const showCountry = (country) => {
    setName(country.name);
  }

  const hideCountry = () => setName("");

  return (
    <div>
      <div>
        <form onSubmit={fetch}>
          {nameInput.asInput()}
        </form>
      </div>

      <CountriesList filter={filter} showCountry={showCountry} countries={countries} />

      <div>
  <h1>Country info { currentCountry === null ? null : <button onClick={hideCountry}>Hide</button> }</h1>
        <Country country={currentCountry} />
      </div>
    </div>
  );
}

export default App;
