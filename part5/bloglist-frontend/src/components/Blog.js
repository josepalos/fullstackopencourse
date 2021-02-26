import React from "react";
import Toggleable from "./Toggleable";
import "./blog.css";

const Blog = ({ blog, likeBlogAction, deleteBlogAction }) => (
    <div className="blog">
        <b>{blog.title}</b>; by <i>{blog.author}</i>
        <Toggleable showButtonLabel="Show details">
            <span className="blog-title"><p>Title: {blog.title}</p></span>
            <span className="blog-url"><p>Url: <a href={blog.url} target="blank">{blog.url}</a></p></span>
            <span className="blog-likes"><p>{blog.likes} <button onClick={() => likeBlogAction(blog)}>Like</button></p></span>
            <span className="blog-author"><p>{blog.author}</p></span>
            <button onClick={() => deleteBlogAction(blog)}>Delete blog</button>
        </Toggleable>
    </div>
);

export default Blog;
