import React from 'react';

const Person = ({person, deletePerson}) => (
    <tr>
        <td>
            {person.name}
        </td>
        <td>
            {person.phone}
        </td>
        <td>
            <button onClick={deletePerson(person)}>
                Delete
            </button>
        </td>
    </tr>
)

export default Person;