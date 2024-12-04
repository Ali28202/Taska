/// <reference types="cypress" />

describe("Signin Flow", () => {
	beforeEach(() => {
		cy.visit("/signin");
	});
	it("Success Signin", () => {
		cy.login();
	});
	it("Failed Signin with incorrect input", () => {
		cy.get("input#signinEmail").type("aaaaa@aaaaa.com");
		cy.get("input#signinPassword").type("aaaaaa");
		cy.get("button#submitSignin").click();
		cy.get("div#signinError");
	});
	it("Failed Signin with empty email field", () => {
		cy.get("input#signinPassword").type("aaaaaa");
		cy.get("button#submitSignin").click();
		cy.get("div#signinError");
	});
	it("Failed Signin with all fields empty", () => {
		cy.get("button#submitSignin").click();
		cy.get("div#signinError");
	});
});
