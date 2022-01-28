const supertest = require("supertest");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const helper = require("./test_helper");
const { closeDatabase } = require("../database");

const app = require("../app");
const api = supertest(app);


describe("when there is initially one user in db", () => {
    beforeEach(async () => {
        await User.deleteMany();

        const passwordHash = await bcrypt.hash("sekret", 10);
        const user = new User({username: "root", passwordHash});

        await user.save();
    });
    
    test("creation succeds with a fresh username", async () => {
        const usersAtStart = await helper.usersInDb();
        const newUser = {
            username: "josep",
            name: "Josep",
            password: "super secure password",
        };
        await api
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/);
        
        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
        
        const usernames = usersAtEnd.map(u => u.username);
        expect(usernames).toContain(newUser.username);
    });

    test("creation fails with an existing username", async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: "root",
            name: "Root",
            password: "1234",
        };

        const response = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/);

        expect(response.body.error)
            .toContain('`username` to be unique');
        
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    });
});

describe("When creating a new user", () => {
    test("if the username is less than 3 characters it fails", async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: "aa",
            name: "Josep",
            password: "super secure password",
        };
        await api
            .post("/api/users")
            .send(newUser)
            .expect(400);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
    
    test("if the password is less than 3 characters it fails", async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: "validusername",
            name: "Josep",
            password: "aa",
        };
        await api
            .post("/api/users")
            .send(newUser)
            .expect(400);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
})

describe("When fetching the users details", () => {
    beforeEach(async () => {
        await User.deleteMany();

        const passwordHash = await bcrypt.hash("sekret", 10);
        const user = new User({username: "root", passwordHash});

        await user.save();
    });

    test("the usernames are returned", async () => {
        const response = await api.get("/api/users");
        const users = response.body
        const usernames = users.map(u => u.username);

        expect(usernames).toContain("root");
    });

    test("the passwords are not returned", async () => {
        const response = await api.get("/api/users");
        const users = response.body
        expect(users.some(u => u.hasOwnProperty("passwordHash"))).toBe(false);
    });
})


afterAll(() => {
    closeDatabase();
});