import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { notify } from '../reducers/notificationReducer';
import Filter from './Filter';
import { Link } from 'react-router-dom';

const AnecdoteList = () => {
    const dispatch = useDispatch();
    const vote = (anecdote) => {
        console.log('vote', anecdote.id);
        dispatch(voteAnecdote(anecdote));
        dispatch(notify(`You voted "${anecdote.content}"`, 5000));
    }

    const filter = useSelector(state => state.filter);
    console.log(`Using filter ${filter}`);

    const anecdotes = useSelector(state => state.anecdotes)
        .filter(anecdote => anecdote.content.toLowerCase().includes(filter))
        .sort((a,b) => a.votes < b.votes);
    
    return <>
        <h2>Anecdotes</h2>
        <Filter />
        <ul>
            {anecdotes.map(anecdote => <li key={anecdote.id}>
                <Link to={`/anecdotes/${anecdote.id}`}>
                    {anecdote.content}
                </Link>
                &nbsp;({anecdote.votes})&nbsp;
                <button onClick={() => vote(anecdote)}>Vote</button>
            </li>)}
        </ul>
    </>;
}

export default AnecdoteList;