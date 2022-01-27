import React from 'react';

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

export default Course;