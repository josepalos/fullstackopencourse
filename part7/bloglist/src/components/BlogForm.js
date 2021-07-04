import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { createBlog } from "../reducers/blogReducer";

const BlogForm = () => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const newBlog = (event) => {
        event.preventDefault();

        dispatch(createBlog(title, author, url));
        // TODO show the notifications and hide the form
        // newNotification(`Created blog ${title}`, "success");
        // console.log("Created new blog with title", title, ", author", author, "and url", url);
        // newBlogRef.current.toggleVisibility();
        // ---or error
        // newNotification("Error creating the blog", "error");

        setTitle("");
        setAuthor("");
        setUrl("");
    };

    return <form onSubmit={newBlog}>
        <div>
            <label htmlFor="title">Title: </label>
            <input type="text"
                value={title}
                name="title"
                onChange={({ target }) => setTitle(target.value)}
            />
        </div>
        <div>
            <label htmlFor="author">Author: </label>
            <input type="text"
                value={author}
                name="author"
                onChange={({ target }) => setAuthor(target.value)}
            />
        </div>
        <div>
            <label htmlFor="url">URL: </label>
            <input type="text"
                value={url}
                name="url"
                onChange={({ target }) => setUrl(target.value)}
            />
        </div>
        <button type="submit">Create blog</button>
    </form>;
};

export default BlogForm;
