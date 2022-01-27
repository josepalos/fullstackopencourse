import anecdotesService from '../services/anecdotes';


const reducer = (state = [], action) => {
	console.log('state now: ', state)
	console.log('action', action)

	switch (action.type) {
		case "VOTE":
			const note_id = action.note_id;
			return state.map((anecdote) => {
				if (anecdote.id == note_id)
					return { ...anecdote, votes: anecdote.votes + 1 };
				else
					return { ...anecdote };
			})
		case "ADD_ANECDOTE":
			return [...state, action.anecdote];
		case "INIT_ANECDOTES":
			return [...action.anecdotes];
		default: return state
	}
}

const voteAnecdote = (anecdote) => {
	return async dispatch => {
		anecdotesService.voteAnecdote(anecdote);
		dispatch({
			type: "VOTE",
			note_id: anecdote.id
		})
	}
}

const addAnecdote = (content) => {
	return async dispatch => {
		const anecdote = await anecdotesService.createAnecdote(content);
		dispatch({
			type: "ADD_ANECDOTE",
			anecdote
		})
	}
}

const initAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdotesService.getAll();
		dispatch({
			type: "INIT_ANECDOTES",
			anecdotes
		})
	}
}

export default reducer;
export { voteAnecdote, addAnecdote, initAnecdotes };