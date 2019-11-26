import React, { useState } from 'react';

const NewPersonForm = ({addNewPerson}) => {
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    const new_person = {
      name: newName,
      phone: newPhone,
    }

    try{
      addNewPerson(new_person);

      setNewName('');
      setNewPhone('');
    } catch (e) {
      console.log(e);
      alert(e);
    }    
  }

  const handleFormVar = (setter) => (event) => {
    setter(event.target.value);
  }

  return (
    <form onSubmit={addPerson}>
      <div>
        <span>Name: </span>
        <span>
          <input
            value={newName}
            onChange={handleFormVar(setNewName)}
          />
        </span>
      </div>
      <div>
        <span>Number: </span>
        <span>
          <input 
            value={newPhone}
            onChange={handleFormVar(setNewPhone)}
          />
        </span>
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

export default NewPersonForm;