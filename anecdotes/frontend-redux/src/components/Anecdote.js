import React from 'react';
import { useSelector, useDispatch } from 'react-redux'


const Anecdote = ({ anecdote_id }) => {
    const anecdote = useSelector(state => state.anecdotes)
        .find(a => a.id === anecdote_id);
    if(anecdote === undefined){
        return <p>Note not found</p>
    }

    const info = anecdote.info === undefined ? 
        <p>[No additional info]</p> :
        <p><a href={anecdote.info}>+Info</a></p>

    return (<div>
        <h3>{anecdote.content}</h3>
        <p>
            This anecdote has {anecdote.votes} votes.
        </p>
        {info}
    </div>);
};

export default Anecdote;