import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => (
    <h1>{props.course}</h1>
)

const Part = (props) => (
    <p>
        {props.part} {props.exercises}
    </p>
)

const Content = (props) => (
    <>
        {props.parts.map((value, index) => (
            <Part key={value.name} part={value.name} exercises={value.exercises} />
        ))}
    </>
)

const Total = (props) => {
    const sum = (a, b) => a + b;
    return <p>Number of exercises {props.exercises.reduce(sum, 0)}</p>
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    const parts = [
        {
            name: part1,
            exercises: exercises1
        },
        {
            name: part2,
            exercises: exercises2
        },
        {
            name: part3,
            exercises: exercises3
        }
    ];

    return (
        <div>
            <Header course={course} />
            <Content parts={parts} />
            <Total exercises={[exercises1, exercises2, exercises3]} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))