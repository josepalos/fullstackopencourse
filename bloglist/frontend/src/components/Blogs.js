import React from "react";
import { useSelector } from "react-redux";

import BlogForm from "./BlogForm";
import BlogListItem from "./BlogListItem";
import Toggleable from "./Toggleable";


const Blogs = ({ newBlogRef }) => {
    const blogs = useSelector(state => state.blogs);

    const renderBlog = (blog) => <BlogListItem key={blog.id} blog={blog} />;
    const sorterFunc = (blog1, blog2) => blog2.likes - blog1.likes;

    return <>
        <Toggleable buttonLabel="New form" ref={newBlogRef}>
            <BlogForm />
        </Toggleable>
        <div>
            {blogs.sort(sorterFunc).map(renderBlog)}
        </div>
    </>;
};

export default Blogs;