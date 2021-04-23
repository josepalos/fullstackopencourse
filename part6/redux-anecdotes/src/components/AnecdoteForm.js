import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = (props) => {
    const add = async (event) => {
        event.preventDefault();
        const content = event.target.content.value;
        props.addAnecdote(content);
    }

    return (
        <form onSubmit={add}>
            <div><input name="content" /></div>
            <button>create</button>
        </form>
    );
}


const mapDispatchToProps = {
    addAnecdote
}

const ConnectedAnecdoteForm = connect(
    () => {},
    mapDispatchToProps
)(AnecdoteForm);


export default ConnectedAnecdoteForm;