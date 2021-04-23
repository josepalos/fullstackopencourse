import React, { useEffect } from 'react'
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import Filter from './components/Filter';
import { initAnecdotes } from './reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(initAnecdotes())
	}, [dispatch])

	return (
		<div>
			<div>
				<Notification />
			</div>
			<Filter />
			<h2>Anecdotes</h2>
			<AnecdoteList />
			<h2>create new</h2>
			<AnecdoteForm />
		</div>
	)
}

export default App