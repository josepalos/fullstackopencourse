import React from 'react';

const BlogForm = ({ handleNewBlog, title, setTitle, author, setAuthor, url, setUrl }) => (
    <form onSubmit={handleNewBlog}>
        <div>
            <label htmlFor="title">Title: </label>
            <input type="text"
                value={title}
                name="title"
                onChange={({target}) => setTitle(target.value)}
            /> 
        </div>
        <div>
            <label htmlFor="author">Author: </label>
            <input type="text"
                value={author}
                name="author"
                onChange={({target}) => setAuthor(target.value)}
            />
        </div>
        <div>
            <label htmlFor="url">URL: </label>
            <input type="text"
                value={url}
                name="url"
                onChange={({target}) => setUrl(target.value)}
            />
        </div>
        <button type="submit">Create blog</button>
  </form>
)

export default BlogForm;
