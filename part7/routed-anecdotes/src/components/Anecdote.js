import React from 'react';
const Anecdote = ({ anecdote }) => (<div>
	<h1>{anecdote.content}</h1>
	<p>
		has {anecdote.votes} votes.
		</p>
	<p>
		For more info see <a href={anecdote.info}>{anecdote.info}</a>
	</p>
</div>);

export default Anecdote;