import React from 'react';
import BlogForm from './BlogForm';
import Blog from './Blog';
import Toggleable from './Toggleable';


const Blogs = ({ blogs, handleNewBlog, newBlogRef, likeBlogAction, deleteBlogAction }) => {
    const renderBlog = (blog) => <Blog key={blog.id} blog={blog} likeBlogAction={likeBlogAction} deleteBlogAction={deleteBlogAction} />;
    const sorterFunc = (blog1, blog2) => blog2.likes - blog1.likes;

    return <>
        <Toggleable buttonLabel="New form" ref={newBlogRef}>
            <BlogForm handleNewBlog={handleNewBlog} />
        </Toggleable>
        <div>
            {blogs.sort(sorterFunc).map(renderBlog)}
        </div>
    </>
};

export default Blogs;