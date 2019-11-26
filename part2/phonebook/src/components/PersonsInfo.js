import React from 'react';
import Person from './Person';

const PersonsInfo = ({ persons }) => {
    const numbers = () =>
        persons.map((person) => <Person key={person.id} person={person} />)

    return (
        <div>
            <h2>Numbers</h2>
            <table border="1">
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Phone number</td>
                    </tr>
                </thead>
                <tbody>
                    {numbers()}
                </tbody>
            </table>
        </div>
    )
}

export default PersonsInfo;