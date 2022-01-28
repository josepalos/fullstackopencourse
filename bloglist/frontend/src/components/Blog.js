import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { likeBlog } from "../reducers/blogReducer";

const Blog = () => {
    const dispatch = useDispatch();

    const blogId = useParams().id;
    const [blogs, users] = useSelector(state => [state.blogs, state.user.allUsers]);

    const blog = blogs.find(b => b.id === blogId);
    if(!blog){
        return null;
    }

    const creator = users.find(u => u.id === blog.user);
    if(!creator){
        return null;
    }
    console.debug("Creator is", creator.name);

    const handleLike = (event) => {
        event.preventDefault();
        dispatch(likeBlog(blog));
    };

    return <>
        <h1>{blog.title}</h1>
        <a href={blog.url}>{blog.url}</a>
        <p>
            {blog.likes} likes
            <button onClick={handleLike}>Like</button>
        </p>
        <p>Added by <i>{creator.name}</i></p>
    </>;
};

export default Blog;