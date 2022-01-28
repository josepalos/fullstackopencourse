import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogItemList from "./BlogItemList";

describe("Blog component", () => {
    let blog;
    let component;
    let likeBlogAction;

    beforeEach(() => {
        blog = {
            title: "Test blog",
            url: "https//www.test.com/",
            author: "The tester",
            likes: 0
        };
        likeBlogAction = (blog) => {};

        component = render(
            <BlogItemList blog={blog} likeBlogAction={() => likeBlogAction(blog)}/>
        );
    });

    test("renders the title and author", () => {
        expect(component.container).toHaveTextContent(
            `${blog.title}; by ${blog.author}`
        );
    });

    test("does not render the url or number of likes by default", () => {
        expect(component.container.querySelector(".blog-url")).not.toBeVisible();
        expect(component.container.querySelector(".blog-likes")).not.toBeVisible();
    });

    test("after clicking the 'Show details' button, the url and number of likes are shown", () => {
        const details_button = component.getByText("Show details");
        fireEvent.click(details_button);

        expect(component.container.querySelector(".blog-url")).toBeVisible();
        expect(component.container.querySelector(".blog-likes")).toBeVisible();
        expect(component.container.querySelector(".blog-url")).toHaveTextContent(blog.url);
        expect(component.container.querySelector(".blog-likes")).toHaveTextContent(blog.likes);
    });

    test("calls likeBlogAction once when the like button is clicked", () => {
        likeBlogAction = jest.fn();

        const button = component.getByText("Like");
        fireEvent.click(button);

        expect(likeBlogAction.mock.calls).toHaveLength(1);
    });

    test("calls likeBlogAction twice when the like button is clicked twice", () => {
        likeBlogAction = jest.fn();

        const button = component.getByText("Like");
        fireEvent.click(button);
        fireEvent.click(button);

        expect(likeBlogAction.mock.calls).toHaveLength(2);
    });
});


