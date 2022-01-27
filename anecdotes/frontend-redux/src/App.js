import React, { useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import Anecdote from './components/Anecdote';
import About from './components/About';
import Menu from './components/Menu';
import { initAnecdotes } from './reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';
import Footer from './components/Footer';

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(initAnecdotes())
	}, [dispatch])

	const anecdoteMatch = useRouteMatch("/anecdotes/:id");
	const anecdoteId = anecdoteMatch ? anecdoteMatch.params.id : null;

	return (
		<div>
			<h1>Software anecdotes</h1>
			<Menu />
			<div>
				<Notification />
			</div>

			<Switch>
				<Route path="/create">
					<AnecdoteForm />
				</Route>

				<Route path="/about">
					<About />
				</Route>

				<Route path="/anecdotes/:id">
					<Anecdote anecdote_id={anecdoteId} />
				</Route>

				<Route path="/">
					<AnecdoteList />
				</Route>
			</Switch>
			<Footer></Footer>
		</div>
	)
}

export default App