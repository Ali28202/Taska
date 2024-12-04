/// <reference types="cypress" />

describe("Project Creation Flow", () => {
	beforeEach(() => {
		cy.login();
	});
	it("Failed create project with empty name field", () => {
		cy.get("div#projectContainer").find("button#addProject").click();
		cy.get("button#createProject").click().as("createProject");
		cy.get("div#projectError");
	});
	it("Success Creation Project", () => {
		const testNum = Math.floor(Math.random() * 10000);
		cy.get("div#projectContainer").find("button#addProject").click();
		cy.get("input#projectName").type(`${testNum}`);
		cy.get("div#avatarContainer")
			.find(`span#avatar-${Math.floor(Math.random() * 4) + 1}`)
			.find("button")
			.click();
		cy.get("button#createProject").click().as("createProject");
		cy.get("div#listOfProjects").last().should("contain.text", `${testNum}`);
	});
});
