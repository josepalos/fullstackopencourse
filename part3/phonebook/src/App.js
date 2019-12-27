import React, { useState, useEffect } from 'react';
import personService from './services/person';

import PersonsInfo from './components/PersonsInfo';
import NewPersonForm from './components/NewPersonForm';
import PersonsFilter from './components/PersonsFilter';
import {SuccessNotification, ErrorNotification} from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newData, setNewData] = useState({
    name: '',
    phone: '',
  });
  const [filter, setFilter] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const showSuccessNotification = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  }
  
  const showErrorNotification = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(message);
    }, 5000);
  }

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
            showSuccessNotification(`Person ${person.name} added`);
          })
          .catch(error => showErrorNotification(`Error adding person ${newData.name}: ${error}`));
      }
    } catch (error) {
      showErrorNotification(`${error}`);
    }
  }

  const updatePerson = (person) => {
    if(window.confirm(`${person.name} already exists. Do you want to update the phone number?`)){
      personService.update(person)
        .then(person => {
          setPersons(persons.map(p => p.name === person.name ? person : p));
          showSuccessNotification(`Person ${person.name} updated`);
          setNewData({name: '', phone: ''})
        })
        .catch(error => showSuccessNotification(`Error updating person ${person.name}: ${error}`))
    }
  }

  const deletePerson = (person) => () => {
    if(window.confirm(`Are you sure you want to delete ${person.name}?`)){
      personService.remove(person)
        .then(() => showSuccessNotification(`Person ${person.name} successfully removed`))
        .catch(error => showErrorNotification(`Error deleting person ${person.name}: ${error}`));
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
      <SuccessNotification message={successMessage} /> {/* TODO set timer */}
      <ErrorNotification message={errorMessage} />
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
