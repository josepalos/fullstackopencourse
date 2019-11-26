import React from 'react';

const Person = ({person}) => (
    <tr>
        <td>
            {person.name}
        </td>
        <td>
            {person.phone}
        </td>
    </tr>
)

export default Person;