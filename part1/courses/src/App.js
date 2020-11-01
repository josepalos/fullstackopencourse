import React, { useState } from 'react';
import Course from './components/Course';

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

    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        }, 
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    return (
        <div>
            {courses.map(course =>
                <>
                    <Course course={course} key={course.id} />
                    <hr />
                    <CounterButtons counter={counter} setter={setCounter} />
                    <Counter counter={counter}/>
                </>
            )}
        </div>
        
    )
}

export default App;