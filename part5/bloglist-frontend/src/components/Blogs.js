import React from 'react';
import BlogForm from './BlogForm';
import Blog from './Blog';


const renderBlog = (blog) => <Blog key={blog.id} blog={blog} />;

const Blogs = ({
    blogs,
    handleNewBlog,
    newBlogTitle,
    setNewBlogTitle,
    newBlogAuthor,
    setNewBlogAuthor,
    newBlogUrl,
    setNewBlogUrl
}) => (
    <>
        <div>
            <BlogForm handleNewBlog={handleNewBlog}
                title={newBlogTitle}
                setTitle={setNewBlogTitle}
                author={newBlogAuthor}
                setAuthor={setNewBlogAuthor}
                url={newBlogUrl}
                setUrl={setNewBlogUrl}
            />
        </div>
        <div>
            {blogs.map(renderBlog)}
        </div>
    </>
);

export default Blogs;