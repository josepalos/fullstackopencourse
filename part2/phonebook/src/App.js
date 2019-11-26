import React, { useState, useEffect } from 'react';
import personService from './services/person';

import PersonsInfo from './components/PersonsInfo';
import NewPersonForm from './components/NewPersonForm';
import PersonsFilter from './components/PersonsFilter';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newData, setNewData] = useState({
    name: '',
    phone: '',
  });
  const [filter, setFilter] = useState('');

  const persons_to_show = persons.filter(
    (person) => person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleFormVar = (setter) => (event) => {
    setter(event.target.value);
  }

  const setNewName = (name) => {
    console.log("jeje");
    setNewData({...newData, name})
  }
  const setNewPhone = (phone) => {
    setNewData({...newData, phone})
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
    const person = newData;
    try {
      validatePerson(person);

      person.id = persons.length + 1;
      setPersons(persons.concat(person));
      setNewData({name: '', phone: ''})
    } catch (e) {
      console.log(e);
      alert(e);
    }
  }

  useEffect(() => {
    personService.getAll()
      .then(setPersons)
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
        newData={newData}
      />
      <PersonsInfo persons={persons_to_show}/>
    </div>
  )
}

export default App;
