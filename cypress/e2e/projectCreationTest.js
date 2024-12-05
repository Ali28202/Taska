/// <reference types="cypress" />

describe("Project Creation Flow", () => {
	beforeEach(() => {
		cy.signup();
	});
	it("Failed create project with empty name field", () => {
		cy.get("div#projectContainer").find("button#addProject").click();
		cy.get("button#createProject").click().as("createProject");
		cy.get("div#projectError");
	});
	it("Success Creation Project", () => {
		cy.createProject();
	});
});
