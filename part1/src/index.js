import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({course}) => (
    <h1>{course.name}</h1>
)

const Part = ({part, exercises}) => (
    <p>
        {part} {exercises}
    </p>
)

const Content = ({course}) => (
    <>
        {course.parts.map((value) => (
            <Part key={value.name} part={value.name} exercises={value.exercises} />
        ))}
    </>
)

const Total = ({course}) => {
    const sum = (a, b) => a + b;
    const exercises = course.parts.map((value) => value.exercises);
    return <p>Number of exercises {exercises.reduce(sum, 0)}</p>
}

const Course = ({course}) => (
    <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
    </div>
)

const Counter = () => {
    const [ counter, setCounter ] = useState(0);

    const increaseByOne = () => setCounter(counter + 1);
    const resetCounter = () => setCounter(0);
    return (
        <>
            <button onClick={increaseByOne}>
                +
            </button>
            <button onClick={resetCounter}>
                Reset
            </button>
            <p>Count: {counter}</p>
        </>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 20
            }
        ]
    }

    return (
        <div>
            <Course course={course} />
            <hr />
            <Counter />
        </div>
        
    )
}

let counter = 1;

ReactDOM.render(<App counter={counter} />, document.getElementById('root'));