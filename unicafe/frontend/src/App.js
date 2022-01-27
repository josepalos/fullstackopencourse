import React, { useState } from 'react';
import './App.css';

const VoteButton = ({counter}) => (
  <button onClick={() => counter.setter(counter.count + 1)}>
    {counter.name}
  </button>
)

const Counter = ({counter}) => (
  <Statistic name={counter.name} value={counter.count} />
)

const Statistic = ({name, value}) => (
  <tr>
    <td>{name}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({counters}) => {
  const sumCounters = (counters) => (
    counters.reduce( (a, b) => a + b.count, 0)
  )

  const all = sumCounters(counters);

  if (all === 0){
    return <div>
      <h1>Statistics</h1>
      <p>No feedback given</p>
    </div>
  }

  const scores = counters.map((value) => value.count * value.weight)
  const average = scores.reduce((a, b) => a+b, 0) / all;
  const positive_counters = counters.filter((value) => value.weight > 0);
  const positive = sumCounters(positive_counters) / all;

  return <div>
    <h1>Statistics</h1>
    <table>
      <tbody>
        {counters.map((counter) => <Counter key={counter.name} counter={counter} />)}
        <Statistic name="All" value={all} />
        <Statistic name="Average" value={average} />
        <Statistic name="Positive" value={positive} />
      </tbody>
    </table>
  </div>
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const counters = [
     {
       name: "Good", 
       count: good,
       setter: setGood,
       weight: 1
     },
     {
       name: "Neutral",
       count: neutral,
       setter: setNeutral,
       weight: 0
     },
     {
       name: "Bad",
       count: bad,
       setter: setBad,
       weight: -1
     }
  ];

  return (
    <>
      <h1>Give feedback</h1>
      {counters.map((counter) => <VoteButton key={counter.name} counter={counter} />)}
      
      <Statistics counters={counters} />
    </>
  )
}

export default App;
