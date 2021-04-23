import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer';

const Anecdote = ({ anecdote }) => {
    const dispatch = useDispatch();

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteAnecdote(id))
    }

    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)
    const sorted = anecdotes.sort((a,b) => a.votes < b.votes)
    
    return <div>
        {sorted.map((anecdote) => <Anecdote anecdote={anecdote} key={anecdote.id} />)}
    </div>
}

export default AnecdoteList;