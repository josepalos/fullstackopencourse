import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";

test("<BlogForm /> updates parent state and calls onSubmit", () => {
    const createBlog = jest.fn();

    const component = render(
        <BlogForm handleNewBlog={ createBlog } />
    );


    const titleInput = component.container.querySelector("input[name='title']");
    const authorInput = component.container.querySelector("input[name='author']");
    const urlInput = component.container.querySelector("input[name='url']");
    const form = component.container.querySelector("form");

    fireEvent.change(titleInput, {target: { value: "Test blog title" }});
    fireEvent.change(authorInput, {target: { value: "New author" }});
    fireEvent.change(urlInput, {target: { value: "http://test.com/blog" }});
    fireEvent.submit(form);

    expect(createBlog.mock.calls).toHaveLength(1);

    expect(createBlog.mock.calls[0][0]).toBe('Test blog title');
    expect(createBlog.mock.calls[0][1]).toBe('New author');
    expect(createBlog.mock.calls[0][2]).toBe('http://test.com/blog');
});