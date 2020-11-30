const supertest = require("supertest");
const Blog = require("../models/blogs");
const { listWithSixBlogs } = require("./test_helper");
const { closeDatabase } = require("../database");

const app = require("../app");
const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
});

describe("test get blogs", () => {
    beforeEach(async () => {
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

    test("blogs are identified by 'id' and not '_id'", async () => {
        const response = await api.get("/api/blogs");
        expect(response.body[0].id).toBeDefined();
    });
});

describe("test create blogs", () => {
    test("a blog is created when posting", async () => {
        const new_title = "new blog";
        const new_blog = {
            title: new_title,
            author: "Me",
            url: "http://test.com",
            likes: "42",
        }
        await api
            .post("/api/blogs")
            .send(new_blog)
            .expect(201)
            .expect("Content-Type", /application\/json/);
        
        const response = await api.get("/api/blogs");
        
        const titles = response.body.map(r => r.title);

        expect(titles).toContain(new_title);
    });

    test("when posting, the number of posts is increased by 1", async () => {
        let response = await api.get("/api/blogs");
        const before = response.body.length;

        const new_blog = {
            title: "another new blog",
            author: "Me",
            url: "http://test.com",
            likes: "42",
        }
        await api
            .post("/api/blogs")
            .send(new_blog)
            .expect(201);
        
        response = await api.get("/api/blogs");
        expect(response.body).toHaveLength(before + 1);
    });

    test("when creating a new blog without likes, it defaults to 0", async () => {
        const new_blog = {
            title: "yet another new blog",
            author: "Me",
            url: "http://test.com"
        }

        const response = await api
            .post("/api/blogs")
            .send(new_blog)
            .expect(201);
        expect(response.body.likes).toBe(0);
    });

    test("when creating a blog without a title it fails with 400", async () => {
        const new_blog = {
            author: "Me",
            url: "http://test.com",
        };
        const response = await api
            .post("/api/blogs")
            .send(new_blog)
            .expect(400);
    });

    test("when creating a blog without an url it fails with 400", async () => {
        const new_blog = {
            title: "A blog that cannot be created",
            author: "Me",
        };
        const response = await api
            .post("/api/blogs")
            .send(new_blog)
            .expect(400);
    });
});



afterAll(() => {
    closeDatabase();
});