Cypress.Commands.add("login", () => {
	cy.visit("/signin");
	cy.intercept(
		"POST",
		"https://taska-test.liara.run/api/collections/users/auth-with-password"
	).as("postUser");
	cy.get("input#signinEmail").type("test@test.com");
	cy.get("input#signinPassword").type("test1234");
	cy.get("button#submitSignin").click();
	cy.wait("@postUser").url().should("contain", "/project");
});
