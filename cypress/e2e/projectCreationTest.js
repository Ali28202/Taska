/// <reference types="cypress" />

describe("Project Creation Flow", () => {
	beforeEach(() => {
		cy.login();
	});
	it("Success Creation Project", () => {
		cy.get("div#projectContainer").find("button#addProject").click();
		cy.get("input#projectName").type("test");
		cy.get("button#createProject").click().as("createProject");
		cy.get("div#listOfProjects").last().should("contain.text", "test");
	});
	it("Failed create project with empty name field", () => {
		cy.get("div#projectContainer").find("button#addProject").click();
		cy.get("button#createProject").click().as("createProject");
		cy.get("div#projectError");
	});
});
