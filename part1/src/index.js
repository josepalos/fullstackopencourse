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

const Counter = ({counter}) => <p>Count: {counter}</p>

const CounterButtons = ({counter, setter}) => {
    const setToValue = (value) => () => setter(value);
    return (<>
        <button onClick={setToValue(counter + 1)}>
            plus
        </button>
        <button onClick={setToValue(counter - 1)}>
            minus
        </button>
        <button onClick={setToValue(0)}>
            Reset
        </button>
    </>)
}

const App = () => {
    const [counter, setCounter] = useState(0);

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
            <CounterButtons counter={counter} setter={setCounter} />
            <Counter counter={counter}/>
        </div>
        
    )
}

ReactDOM.render(<App />, document.getElementById('root'));