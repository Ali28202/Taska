/// <reference types="cypress" />

describe("SignUp Flow", () => {
	beforeEach(() => {
		cy.visit("/signup");
	});
	it("Success Signup", () => {
		cy.signup();
	});
	it("Failed Signup with empty email field", () => {
		cy.get("input#signupPassword").type("aaaaaaaa");
		cy.get("input#signupName").type("aaaaaaaa");
		cy.get("button#submitSignup").click();
		cy.get("div#signupError");
	});
	it("Failed Signup with empty password field", () => {
		cy.get("input#signupEmail").type("aaaaa@aaaaa.com");
		cy.get("input#signupName").type("aaaaaaaa");
		cy.get("button#submitSignup").click();
		cy.get("div#signupError");
	});
	it("Failed Signup with empty Name field", () => {
		cy.get("input#signupEmail").type("aaaaa@aaaaa.com");
		cy.get("input#signupPassword").type("aaaaaaaa");
		cy.get("button#submitSignup").click();
		cy.get("div#signupError");
	});
	it("Failed Signup with empty email & password field", () => {
		cy.get("input#signupName").type("aaaaaaaa");
		cy.get("button#submitSignup").click();
		cy.get("div#signupError");
	});
	it("Failed Signup with empty name & password field", () => {
		cy.get("input#signupEmail").type("aaaaa@aaaaa.com");
		cy.get("button#submitSignup").click();
		cy.get("div#signupError");
	});
	it("Failed Signup with empty email & name field", () => {
		cy.get("input#signupPassword").type("aaaaaaaa");
		cy.get("button#submitSignup").click();
		cy.get("div#signupError");
	});
	it("Failed Signup with all fields empty", () => {
		cy.get("button#submitSignup").click();
		cy.get("div#signupError");
	});
	it("Failed Signup with invalid password(the length should between 8 and 72)", () => {
		cy.get("input#signupEmail").type("aaaaa@aaaaa.com");
		cy.get("input#signupPassword").type("aaaaaa");
		cy.get("input#signupName").type("aaaaaaaa");
		cy.get("button#submitSignup").click();
		cy.get("div#signupError");
	});
	it("Failed Signup with invalid Email", () => {
		cy.get("input#signupEmail").type("aaaaaaaaaa");
		cy.get("input#signupPassword").type("aaaaaaaa");
		cy.get("input#signupName").type("aaaaaaaa");
		cy.get("button#submitSignup").click();
		cy.get("div#signupError");
	});
});
