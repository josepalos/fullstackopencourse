import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, action}) => (
    <button onClick={action()}>
        {text}
    </button>
)

const MostUpvotedQuote = ({anecdotes, points}) => {
    const get_most_voted_anecdote = () => {
        let max_indice = points.indexOf(Math.max(...points));
        return [anecdotes[max_indice], points[max_indice]];
    }

    const [most_voted_anecdote, most_upvotes] = get_most_voted_anecdote()

    return ( 
        <div>
            <h1>Quote with most upvotes</h1>
            <blockquote>{most_voted_anecdote}</blockquote>
            <p>It has {most_upvotes} votes</p>
        </div>
    )
}

const App = (props) => {
    const set_initial_points = () => {
        let p = []
        for(let i = 0; i < props.anecdotes.length; i++){
            p[i] = 0;
        }
        return p;
    }

    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState( () => set_initial_points())

    const set_random_quote = () => () => {
        let index = Math.floor(Math.random() * props.anecdotes.length);
        setSelected(index);
    }

    const upvote = () => () => {
        const new_points = [...points]; // Equivalent to copy the entire array
        new_points[selected] += 1;
        setPoints(new_points);
    }

    return (
        <div>
            <blockquote>{props.anecdotes[selected]}</blockquote>
            <p>This anecdote has {points[selected]} upvotes</p>
            <div>
                <Button text="Get random quote" action={set_random_quote} />
                <Button text="Vote" action={upvote} />
            </div>
            <MostUpvotedQuote anecdotes={anecdotes} points={points}/>
        </div>
    )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)