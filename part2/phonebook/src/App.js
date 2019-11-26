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
    setNewData({...newData, name})
  }
  const setNewPhone = (phone) => {
    setNewData({...newData, phone})
  }

  const validatePerson = (person) => {
    if (person.name === '') {
      throw new Error("Name cannot be empty");
    }
  }
  
  const addNewPerson = (event) => {
    event.preventDefault();
    validatePerson(newData);
    try {
      const existing_person = persons.find(p => p.name === newData.name);

      if(existing_person !== undefined){
        updatePerson({...newData, id: existing_person.id});
      }else{
        personService.create(newData)
          .then(person => {
            setPersons(persons.concat(person));
            setNewData({name: '', phone: ''})
        })
      }
    } catch (e) {
      console.log(e);
      alert(e);
    }
  }

  const updatePerson = (person) => {
    if(window.confirm(`${person.name} already exists. Do you want to update the phone number?`)){
      personService.update(person)
        .then(person => setPersons(
          persons.map(p => p.name === person.name ? person : p))
        )
    }
  }

  const deletePerson = (person) => () => {
    if(window.confirm(`Are you sure you want to delete ${person.name}?`)){
      personService.remove(person);
      setPersons(persons.filter(p => p.id !== person.id));
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
      <PersonsInfo persons={persons_to_show} deletePerson={deletePerson}/>
    </div>
  )
}

export default App;
