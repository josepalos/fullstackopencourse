import React, { useState } from 'react';

const NewPersonForm = ({addNewPerson}) => {
  const [newName, setNewName] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    if (newName === ''){
      console.log("Empty name");
      return
    }

    const new_person = {
      name: newName
    }
    addNewPerson(new_person);
    setNewName('');
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  return (
    <form onSubmit={addPerson}>
      <div>
        <span>name: </span>
        <span>
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </span>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default NewPersonForm;