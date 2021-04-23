const jwt = require("jsonwebtoken");
const supertest = require("supertest");
const Blog = require("../models/blogs");
const User = require("../models/user");
const { listWithSixBlogs, initialUsers } = require("./test_helper");
const { closeDatabase } = require("../database");

const app = require("../app");
const api = supertest(app);

const getToken = (user_id) => {
    const user = initialUsers.filter(u => u._id == user_id)[0]
    return jwt.sign({
        username: user.username,
        id: user._id
    }, process.env.SECRET)
}

beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const newUsers = initialUsers.map(user => new User(user));
    const promiseArray = newUsers.map(user => user.save());
    await Promise.all(promiseArray);
});

describe("When getting the blogs", () => {
    beforeEach(async () => {
        const newBlogs = listWithSixBlogs.map(blog => new Blog(blog));
        const promiseArray = newBlogs.map(blog => blog.save());
        await Promise.all(promiseArray);
    });
    
    test("they are returned as json", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    test("they are identified by 'id' and not '_id'", async () => {
        const response = await api.get("/api/blogs");
        expect(response.body[0].id).toBeDefined();
    });
    
    test("all of them are returned", async () => {
        const response = await api.get("/api/blogs");
        expect(response.body).toHaveLength(6);
    });
});

describe("When posting a blog", () => {
    test("it is created", async () => {
        const new_title = "new blog";
        const new_blog = {
            title: new_title,
            author: "Me",
            url: "http://test.com",
            likes: "42",
        }

        const token = getToken(initialUsers[0]._id);
        await api
            .post("/api/blogs")
            .set("Authorization", `bearer ${token}`)
            .send(new_blog)
            .expect(201)
            .expect("Content-Type", /application\/json/);
        
        const response = await api.get("/api/blogs");
        
        const titles = response.body.map(r => r.title);

        expect(titles).toContain(new_title);
    });

    test("the number of posts is increased by 1", async () => {
        let response = await api.get("/api/blogs");
        const before = response.body.length;

        const new_blog = {
            title: "another new blog",
            author: "Me",
            url: "http://test.com",
            likes: "42",
        }

        const token = getToken(initialUsers[0]._id);
        await api
            .post("/api/blogs")
            .set("Authorization", `bearer ${token}`)
            .send(new_blog)
            .expect(201);
        
        response = await api.get("/api/blogs");
        expect(response.body).toHaveLength(before + 1);
    });

    test("without likes, it defaults to 0", async () => {
        const new_blog = {
            title: "yet another new blog",
            author: "Me",
            url: "http://test.com"
        }

        const token = getToken(initialUsers[0]._id);
        const response = await api
            .post("/api/blogs")
            .set("Authorization", `bearer ${token}`)
            .send(new_blog)
            .expect(201);
        expect(response.body.likes).toBe(0);
    });

    test("without a title it fails with 400", async () => {
        const new_blog = {
            author: "Me",
            url: "http://test.com",
        };
        const token = getToken(initialUsers[0]._id);
        await api
            .post("/api/blogs")
            .set("Authorization", `bearer ${token}`)
            .send(new_blog)
            .expect(400);
    });

    test("without an url it fails with 400", async () => {
        const new_blog = {
            title: "A blog that cannot be created",
            author: "Me",
        };
        const token = getToken(initialUsers[0]._id);
        await api
            .post("/api/blogs")
            .set("Authorization", `bearer ${token}`)
            .send(new_blog)
            .expect(400);
    });
});

describe("When deleting a blog", () => {
    beforeEach(async () => {
        const newBlogs = listWithSixBlogs.map(blog => new Blog(blog));
        const promiseArray = newBlogs.map(blog => blog.save());
        await Promise.all(promiseArray);
    });

    test("it is deleted", async () => {
        const id_to_delete = listWithSixBlogs[0]._id;

        const token = getToken(initialUsers[0]._id);
        await api
            .delete(`/api/blogs/${id_to_delete}`)
            .set("Authorization", `bearer ${token}`)
            .expect(204);
        
        const response = await api.get("/api/blogs");
        const ids = response.body.map(r => r.id);
        expect(ids).not.toContain(id_to_delete);

    });

    test("the number of blogs is reduced by one", async () => {
        let response = await api.get("/api/blogs");
        const before = response.body.length;

        const id_to_delete = listWithSixBlogs[0]._id;
        const token = getToken(initialUsers[0]._id);
        await api
            .delete(`/api/blogs/${id_to_delete}`)
            .set("Authorization", `bearer ${token}`);
        
        response = await api.get("/api/blogs");
        expect(response.body).toHaveLength(before - 1);
    });
});

describe("When putting a blog", () => {
    beforeEach(async () => {
        const newBlogs = listWithSixBlogs.map(blog => new Blog(blog));
        const promiseArray = newBlogs.map(blog => blog.save());
        await Promise.all(promiseArray);
    });

    test("the blog is updated", async () => {
        let response = await api.get("/api/blogs")
        const before = response.body[0];
        
        const new_data = {
            likes: before.likes + 10,
        }

        const token = getToken(initialUsers[0]._id);
        await api
            .put(`/api/blogs/${before.id}`)
            .set("Authorization", `bearer ${token}`)
            .send(new_data)
            .expect(200);

        response = await api.get("/api/blogs");
        const blog = response.body.filter(r => r.id == before.id)[0];
        expect(blog.likes).toBe(new_data.likes);
    });

    test("the blog attributes not updated do not change", async () => {
        let response = await api.get("/api/blogs")
        const before = response.body[0];
        
        const new_data = {
            likes: before.likes + 10,
        }

        const token = getToken(initialUsers[0]._id);
        await api
            .put(`/api/blogs/${before.id}`)
            .set("Authorization", `bearer ${token}`)
            .send(new_data)
            .expect(200);

        response = await api.get("/api/blogs");
        const blog = response.body.filter(r => r.id == before.id)[0];
        expect(blog.title).toBe(before.title);
        expect(blog.author).toBe(before.author);
        expect(blog.url).toBe(before.url);
    });

    test("it fails if the data has  unexpected fields", async () => {
        let response = await api.get("/api/blogs")
        const id = response.body[0].id;
        
        const new_data = {
            likes: 10,
            unexpected_field: "break all the things"
        }

        const token = getToken(initialUsers[0]._id);
        await api
            .put(`/api/blogs/${id}`)
            .set("Authorization", `bearer ${token}`)
            .send(new_data)
            .expect(400);
    });

    test("it fails when the id sent in the data is not the same as the one in the url", async () => {
        let response = await api.get("/api/blogs")
        const id = response.body[0].id;
        
        const new_data = {
            id: 10,
            likes: 10,
        }

        const token = getToken(initialUsers[0]._id);
        await api
            .put(`/api/blogs/${id}`)
            .set("Authorization", `bearer ${token}`)
            .send(new_data)
            .expect(400);
    });
})


afterAll(() => {
    closeDatabase();
});