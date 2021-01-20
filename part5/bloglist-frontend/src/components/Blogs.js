import React from 'react';
import BlogForm from './BlogForm';
import Blog from './Blog';
import Toggleable from './Toggleable';

const renderBlog = (blog) => <Blog key={blog.id} blog={blog} />;

const Blogs = ({ blogs, handleNewBlog, newBlogRef }) => (
    <>
        <Toggleable buttonLabel="New form" ref={newBlogRef}>
            <BlogForm handleNewBlog={handleNewBlog} />
        </Toggleable>
        <div>
            {blogs.map(renderBlog)}
        </div>
    </>
);

export default Blogs;