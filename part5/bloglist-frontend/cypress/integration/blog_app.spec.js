const BASE_FRONTEND_URL = "http://localhost:3000";
const BASE_BACKEND_URL = "http://localhost:3001/api";

describe("Blog app", function(){
    beforeEach(function(){
        cy.request("POST", `${BASE_BACKEND_URL}/testing/reset`);
        const user = {
            name: "Test",
            username: "testuser",
            password: "Correct Horse Battery Staple"
        };

        cy.request("POST", `${BASE_BACKEND_URL}/users/`, user);

        cy.visit(BASE_FRONTEND_URL);
    });

    it("front page can be opened", function(){
        cy.contains("blogs");
    });

    it("login form can be opened", function(){
        cy.contains("Login").click();
    });

    it("user can login", function(){
        cy.contains("Login").click();

        cy.get(".login-form").within(() => {
            cy.get("input[name='Username']").type("testuser");
            cy.get("input[name='Password']").type("Correct Horse Battery Staple");

            cy.contains("Login").click();
        });

        cy.contains("Logged in as");
    });

    it("login fails with wrong password", function (){
        cy.contains("Login").click();

        cy.get(".login-form").within(() => {
            cy.get("input[name='Username']").type("testuser");
            cy.get("input[name='Password']").type("password1234");

            cy.contains("Login").click();
        });

        cy.get(".error_notification")
            .contains("Wrong credentials")
            .and("have.css", "color", "rgb(255, 0, 0)");

        cy.get("html").should("not.contain", "Logged in as");
    });

    describe("when logged in", function(){
        beforeEach(function(){
            cy.login({ username: "testuser", password: "Correct Horse Battery Staple" });
        });

        it("a new blog can be created", function() {
            cy.contains("Show").click();

            cy.get("form").within(() => {
                cy.get("input[name='title']").type("The best test post ever");
                cy.get("input[name='author']").type("Test author");
                cy.get("input[name='url']").type("http://test.org");

                cy.contains("Create blog").click();
            });

            cy.get("html").contains("The best test post ever; by Test author");
        });

        describe("and a blog exists", function() {
            beforeEach(function() {
                cy.createBlog({
                    title: "Le blog",
                    author: "me",
                    url: "http://me.org/blog"
                });
            });

            it("the blog can be seen", function() {
                cy.contains("Le blog; by me");
            });

            it("the user can like the blog", function(){
                cy.get(".blog").within(() => {
                    cy.contains("Show details").click();

                    cy.contains("Like").click();
                    cy.get(".blog-likes").contains("1");
                });
            });

            it("the user can delete the blog", function(){
                cy.get(".blog").within(() => {
                    cy.contains("Show details").click();

                    cy.contains("Delete blog").click();
                });

                cy.get("html").should("not.contain", "Le blog");
            });
        });

        describe("and multiple blog exist", function() {
            beforeEach(function() {
                cy.createBlog({ title: "Le blog", author: "me", url: "http://me.org/blog", likes: 10 });
                cy.createBlog({ title: "Invisible blog", author: "me", url: "http://me.org/blog", likes: 0 });
                cy.createBlog({ title: "Viral", author: "me", url: "http://me.org/blog", likes: 5000 });
            });
            const expected_order = ["Viral", "Le blog", "Invisible blog"];

            it.only("The blogs are sorted by likes", function(){
                cy.get(".blog > b")
                    .then($items => {
                        return $items.map((index, html) => Cypress.$(html).text()).get();
                    })
                    .should("deep.eq", expected_order);
            });
        });
    });
});
