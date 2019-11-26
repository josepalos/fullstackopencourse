import React from 'react';

const NewPersonForm = ({ addPerson, onNameChange, onPhoneChange, newName, newPhone }) => {
  return (
    <div>
      <h2>Add new person</h2>
      <form onSubmit={addPerson}>
        <div>
          <span>Name: </span>
          <span>
            <input
              value={newName}
              onChange={onNameChange}
            />
          </span>
        </div>
        <div>
          <span>Number: </span>
          <span>
            <input
              value={newPhone}
              onChange={onPhoneChange}
            />
          </span>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  )
}

export default NewPersonForm;