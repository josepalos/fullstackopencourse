import React from 'react';

const Total = ({course}) => {
    const sum = (a, b) => a + b;
    const exercises = course.parts.map((value) => value.exercises);
    return <p><b>Total of exercises {exercises.reduce(sum, 0)}</b></p>
}

export default Total;