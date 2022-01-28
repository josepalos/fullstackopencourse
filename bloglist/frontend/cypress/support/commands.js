const BASE_FRONTEND_URL = "http://localhost:3000";
const BASE_BACKEND_URL = "http://localhost:3001/api";

Cypress.Commands.add("login", ({ username, password }) => {
    cy.request("POST", `${BASE_BACKEND_URL}/login`, { username, password }).then(response => {
        localStorage.setItem("loggedBlogsappUser", JSON.stringify(response.body));
        cy.visit(BASE_FRONTEND_URL);
    });
});

Cypress.Commands.add("createBlog", ({ title, author, url, likes = 0 }) => {
    cy.request({
        url: `${BASE_BACKEND_URL}/blogs`,
        method: "POST",
        body: { title, author, url, likes },
        headers: {
            "Authorization": `bearer ${JSON.parse(localStorage.getItem("loggedBlogsappUser")).token}`
        }
    });

    cy.visit(BASE_FRONTEND_URL);
});