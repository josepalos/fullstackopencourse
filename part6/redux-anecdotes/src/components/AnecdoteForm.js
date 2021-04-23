import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const add = async (event) => {
        event.preventDefault();
        const content = event.target.content.value;
        dispatch(addAnecdote(content));
    }

    return (
        <form onSubmit={add}>
            <div><input name="content" /></div>
            <button>create</button>
        </form>
    );
}


export default AnecdoteForm;