import React from 'react';
import Course from './components/Course';

const App = ({ courses }) => {
    const divs = () => courses.map(course => {
        return <Course key={course.id} course={course} />;
    })

    return (
        <div>
            {divs()}
        </div>
    )
}

export default App;