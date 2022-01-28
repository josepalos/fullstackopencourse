import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteBlog, likeBlog } from "../reducers/blogReducer";

import Toggleable from "./Toggleable";
import "./BlogListItem.css";


const BlogListItem = ({ blog }) => {
    const dispatch = useDispatch();

    const handleDelete = (event) => {
        event.preventDefault();

        if(window.confirm(`Do you want to delete the blog ${blog.title}?`)){
            console.log("Delete blog", blog);
            dispatch(deleteBlog(blog.id));
            // TODO notify on success/error
            // newNotification(`Deleted blog ${blog.title}`, "success");
        }
    };

    const handleLike = (event) => {
        event.preventDefault();
        dispatch(likeBlog(blog));
    };
    return (
        <div className="blog">
            <b>{blog.title}</b>; by <i>{blog.author}</i>
            <Toggleable showButtonLabel="Show details">
                <span className="blog-title">
                    <Link to={`/blogs/${blog.id}`} >
                        Title: {blog.title}
                    </Link>
                </span>
                <span className="blog-url">
                    <p>Url: <a href={blog.url} target="blank">{blog.url}</a></p>
                </span>
                <span className="blog-likes">
                    <p>{blog.likes} <button onClick={handleLike}>Like</button></p>
                </span>
                <span className="blog-author">
                    <p>{blog.author}</p>
                </span>
                <button onClick={handleDelete}>Delete blog</button>
            </Toggleable>
        </div>
    );
};

export default BlogListItem;
