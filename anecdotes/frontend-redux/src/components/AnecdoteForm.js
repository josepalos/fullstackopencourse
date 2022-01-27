import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { useField } from '../hooks';

const AnecdoteForm = (props) => {
    const content = useField("content");
    const author = useField("author");
    const info = useField("info");

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newAnecdote = {
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        };

        props.addAnecdote(newAnecdote);

        history.push("/");
    }

    const clearForm = (e) => {
		e.preventDefault();
		content.clear();
		author.clear();
		info.clear();
	}

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={ handleSubmit }>
                <div>
                    Content: {content.asFormField()}
                </div>
                <div>
                    Author: {author.asFormField()}
                </div>
                <div>
                    Url for more info: {info.asFormField()}
                </div>
                <button>Create</button>
                <button onClick={ clearForm }>Reset</button>
            </form>
        </>
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