import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => (
    <h1>{props.course.name}</h1>
)

const Part = (props) => (
    <p>
        {props.part} {props.exercises}
    </p>
)

const Content = (props) => (
    <>
        {props.course.parts.map((value) => (
            <Part key={value.name} part={value.name} exercises={value.exercises} />
        ))}
    </>
)

const Total = (props) => {
    const sum = (a, b) => a + b;
    const exercises = props.course.parts.map((value) => value.exercises);
    return <p>Number of exercises {exercises.reduce(sum, 0)}</p>
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
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))