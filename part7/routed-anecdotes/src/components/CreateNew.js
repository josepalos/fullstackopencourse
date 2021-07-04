import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useField } from '../hooks';


const CreateNew = (props) => {
	const content = useField("content")
	const author = useField("author");
	const info = useField("info")

	const history = useHistory();
	const handleSubmit = (e) => {
		e.preventDefault();
		props.addNew({
			content: content.value,
			author: author.value,
			info: info.value,
			votes: 0
		});
		history.push("/");
	};
	return (<div>
		<h2>create a new anecdote</h2>
		<form onSubmit={handleSubmit}>
			<div>
				content
				{content.asFormField()}
			</div>
			<div>
				author
				{author.asFormField()}
			</div>
			<div>
				url for more info
				{info.asFormField()}
			</div>
			<button>create</button>
		</form>
	</div>);
};

export default CreateNew;