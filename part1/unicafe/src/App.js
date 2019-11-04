import React, { useState } from 'react';
import './App.css';

const VoteButton = ({counter}) => (
  <button onClick={() => counter.setter(counter.count + 1)}>
    {counter.name}
  </button>
)

const Counter = ({counter}) => (
  <p>{counter.name}: {counter.count}</p>
)

const Statistics = ({counters}) => {
  const sumCounters = (counters) => (
    counters.reduce( (a, b) => a + b.count, 0)
  )

  const all = sumCounters(counters);
  let average = 0;
  let positive = 0;
  if(all !== 0){
    const scores = counters.map((value) => value.count * value.weight)
    average = scores.reduce((a, b) => a+b, 0) / all;
    const positive_counters = counters.filter((value) => value.weight > 0);
    positive = sumCounters(positive_counters) / all;
  }

  return <>
    <p>All: {all}</p>
    <p>Average: {average}</p>
    <p>Positive: {positive} %</p>
  </>
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
      {counters.map((counter) => <VoteButton counter={counter} />)}

      <h1>Statistics</h1>
      {counters.map((counter) => <Counter counter={counter} />)}

      <Statistics counters={counters} />
    </>
  )
}

export default App;
