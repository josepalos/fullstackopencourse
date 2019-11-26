import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PersonsInfo from './components/PersonsInfo';
import NewPersonForm from './components/NewPersonForm';
import PersonsFilter from './components/PersonsFilter';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState('');

  const persons_to_show = persons.filter(
    (person) => person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleFormVar = (setter) => (event) => {
    setter(event.target.value);
  }

  const validatePerson = (person) => {
    let all_names = persons.map(p => p.name);
    if (person.name === '') {
      throw new Error("Name cannot be empty");
    } else if (all_names.indexOf(person.name) !== -1) {
      throw new Error(`Name ${person.name} already in the phonebook`);
    }


  }
  
  const addNewPerson = (event) => {
    event.preventDefault();
    const person = {
      name: newName,
      phone: newPhone,
    }

    try {
      validatePerson(person);

      person.id = persons.length;
      setPersons(persons.concat(person));
      setNewName('');
      setNewPhone('');
    } catch (e) {
      console.log(e);
      alert(e);
    }
  }

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonsFilter
        filter={filter}
        setFilter={setFilter}
      />
      <NewPersonForm
        addPerson={addNewPerson}
        onNameChange={handleFormVar(setNewName)}
        onPhoneChange={handleFormVar(setNewPhone)}
        newName={newName}
        newPhone={newPhone}
      />
      <PersonsInfo persons={persons_to_show}/>
    </div>
  )
}

export default App;
