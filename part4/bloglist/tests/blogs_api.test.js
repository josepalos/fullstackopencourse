const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/blogs");
const { listWithSixBlogs } = require("./test_helper");
const { closeDatabase } = require("../database");

const app = require("../app");
const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});

    const newBlogs = listWithSixBlogs.map(blog => new Blog(blog));
    const promiseArray = newBlogs.map(blog => blog.save());
    await Promise.all(promiseArray);
});

test("blogs are returned as json", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
});

test("given 6 blogs, the get method returns all of them", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(6);
});

afterAll(() => {
    closeDatabase();
});