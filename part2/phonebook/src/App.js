import React, {useState} from 'react';
import Person from './components/Person';
import NewPersonForm from './components/NewPersonForm';

const App = () => {
  const [ persons, setPersons ] = useState([
    {
      id: 0,
      name: "Arto Hellas"
    },
  ]);

  const numbers = () =>
    persons.map( (person) => <Person key={person.id} person={person}/> )

  const addNewPerson = (person) => {
    console.log("Adding ", person);
    person.id = persons.length;
    setPersons(persons.concat(person));
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <NewPersonForm addNewPerson={addNewPerson} />
      <h2>Numbers</h2>
      {numbers()}
    </div>
  )
}

export default App;
