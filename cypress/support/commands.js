Cypress.Commands.add("login", () => {
	cy.visit("/signin");
	cy.intercept(
		"POST",
		`${Cypress.env(
			"REACT_APP_POCKETBASE_TEST_URL"
		)}/api/collections/users/auth-with-password`
	).as("postUser");
	cy.get("input#signinEmail").type("test@test.com");
	cy.get("input#signinPassword").type("test1234");
	cy.get("button#submitSignin").click();
	cy.wait("@postUser").url().should("contain", "/project");
});
Cypress.Commands.add("signup", () => {
	cy.visit("/signup");
	cy.get("input#signupEmail").type(
		`${Math.floor(Math.random() * 1000000)}@gmail.com`
	);
	cy.get("input#signupPassword").type("test1234");
	cy.get("input#signupName").type("test");
	cy.get("button#submitSignup").click();
	cy.url().should("contain", "/project");
});
Cypress.Commands.add("createProject", () => {
	const testNum = Math.floor(Math.random() * 1000000);
	cy.get("div#projectContainer").find("button#addProject").click();
	cy.get("input#projectName").type(`${testNum}`);
	cy.get("div#avatarContainer")
		.find(`span#avatar-${Math.floor(Math.random() * 4) + 1}`)
		.find("button")
		.click();
	cy.get("button#createProject").click().as("createProject");
	cy.get("div#listOfProjects")
		.children()
		.first()
		.should("contain.text", `${testNum}`);
});
Cypress.Commands.add("createTask", () => {
	cy.get("div#taskListContainer-todo").find("button#addTask").click();
	// title
	cy.get("div#addTaskForm").find("div").first().find("input").type("test");
	// description
	cy.get("div#addTaskForm")
		.find("div")
		.last()
		.find("textarea")
		.first()
		.type("test");
	// date
	cy.get("div#addTaskForm").find("input").last().type("2025-03-10");
	cy.get("div#addTaskForm").find("button").last().click();
});
