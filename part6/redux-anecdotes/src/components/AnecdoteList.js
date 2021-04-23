import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer';
import {notify, hideNotification} from '../reducers/notificationReducer';

const Anecdote = ({ anecdote }) => {
    const dispatch = useDispatch();

    const vote = (anecdote) => {
        console.log('vote', anecdote.id);
        dispatch(voteAnecdote(anecdote));
        dispatch(notify(`You voted "${anecdote.content}"`, 5000));
    }

    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const filter = useSelector(state => state.filter);
    console.log(`Using filter ${filter}`);

    const anecdotes = useSelector(state => state.anecdotes)
        .filter(anecdote => anecdote.content.toLowerCase().includes(filter))
        .sort((a,b) => a.votes < b.votes);
    
    return <div>
        {anecdotes.map((anecdote) => <Anecdote anecdote={anecdote} key={anecdote.id} />)}
    </div>
}

export default AnecdoteList;