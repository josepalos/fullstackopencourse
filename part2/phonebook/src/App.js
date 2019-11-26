import React, { useState } from 'react';
import PersonsInfo from './components/PersonsInfo';
import NewPersonForm from './components/NewPersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    {
      id: 0,
      name: "Arto Hellas"
    },
  ]);

  const validatePerson = (person) => {
    let all_names = persons.map(p => p.name);
    if (person.name === '') {
      throw new Error("Name cannot be empty");
    } else if (all_names.indexOf(person.name) !== -1) {
      throw new Error(`Name ${person.name} already in the phonebook`);
    }


  }
  const addNewPerson = (person) => {
    validatePerson(person);

    person.id = persons.length;
    setPersons(persons.concat(person));
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <NewPersonForm addNewPerson={addNewPerson} />
      <PersonsInfo persons={persons}/>
    </div>
  )
}

export default App;
