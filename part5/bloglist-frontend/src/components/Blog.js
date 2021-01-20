import React from 'react';
import Toggleable from './Toggleable';
import './blog.css';

const Blog = ({ blog }) => (
  <div className="blog">
    <b>{blog.title}</b>; by <i>{blog.author}</i>
    <Toggleable showButtonLabel="Show details">
      <p>Title: {blog.title}</p>
      <p>Url: <a href={blog.url} target="blank">{blog.url}</a></p>
      <p>{blog.likes} <button>Like</button></p>
      <p>{blog.author}</p>
    </Toggleable>
  </div>
)

export default Blog
