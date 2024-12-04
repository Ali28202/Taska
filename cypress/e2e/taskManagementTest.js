/// <reference types="cypress" />

describe("Task Management Flow", () => {
	beforeEach(() => {
		cy.login();
		cy.get("div#listOfProjects").find("button").first().click();
	});
	//CREATE TASK
	it.only("Success Creating Task", () => {
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
	it("failed creation Task with all fields empty ", () => {
		cy.get("div#taskListContainer-todo").find("button#addTask").click();
		cy.get("div#addTaskForm").find("button").last().click();
		cy.get("div#errModal");
	});
	it("failed creation Task with empty title field", () => {
		cy.get("div#taskListContainer-todo").find("button#addTask").click();
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
		cy.get("div#errModal");
	});
	it("failed creation Task with empty description field", () => {
		cy.get("div#taskListContainer-todo").find("button#addTask").click();
		// title
		cy.get("div#addTaskForm").find("div").first().find("input").type("test");
		// date
		cy.get("div#addTaskForm").find("input").last().type("2025-03-10");
		cy.get("div#addTaskForm").find("button").last().click();
		cy.get("div#errModal");
	});
	it("failed creation Task with empty date field", () => {
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
		cy.get("div#addTaskForm").find("button").last().click();
		cy.get("div#errModal");
	});
	it("failed creation Task with empty title and description field", () => {
		cy.get("div#taskListContainer-todo").find("button#addTask").click();
		// date
		cy.get("div#addTaskForm").find("input").last().type("2025-03-10");
		cy.get("div#addTaskForm").find("button").last().click();
		cy.get("div#errModal");
	});
	it("failed creation Task with empty title and date field", () => {
		cy.get("div#taskListContainer-todo").find("button#addTask").click();
		// description
		cy.get("div#addTaskForm")
			.find("div")
			.last()
			.find("textarea")
			.first()
			.type("test");
		cy.get("div#addTaskForm").find("button").last().click();
		cy.get("div#errModal");
	});
	it("failed creation Task with empty description and date field", () => {
		cy.get("div#taskListContainer-todo").find("button#addTask").click();
		// title
		cy.get("div#addTaskForm").find("div").first().find("input").type("test");
		cy.get("div#addTaskForm").find("button").last().click();
		cy.get("div#errModal");
	});

	// EDIT TASK
	it("Success edit title", () => {
		cy.get("div#taskListContainer-todo")
			.find("section")
			.first()
			.find("button#editButton")
			.click();
		cy.get("div#editorForm").find("input#title").type("editTitle");
		cy.get("div#editorForm").find("button#submitEdit").click();
		cy.get("div#taskListContainer-todo")
			.find("section")
			.first()
			.should("contain", "editTitle");
	});
	it("Success edit description", () => {
		cy.get("div#taskListContainer-todo")
			.find("section")
			.first()
			.find("button#editButton")
			.click();
		cy.get("div#editorForm").find("textarea#description").type("editDesc");
		cy.get("div#editorForm").find("button#submitEdit").click();
		cy.get("div#taskListContainer-todo")
			.find("section")
			.first()
			.should("contain", "editDesc");
	});
	it("Success edit date", () => {
		cy.get("div#taskListContainer-todo")
			.find("section")
			.first()
			.find("button#editButton")
			.click();
		cy.get("div#editorForm").find("input#date").type("2025-04-20");
		cy.get("div#editorForm").find("button#submitEdit").click();
		cy.get("div#taskListContainer-todo")
			.find("section")
			.first()
			.should("contain", "2025-04-20");
	});
	it("Success edit title and description", () => {
		cy.get("div#taskListContainer-todo")
			.find("section")
			.first()
			.find("button#editButton")
			.click();
		cy.get("div#editorForm").find("input#title").type("editTitle");
		cy.get("div#editorForm").find("textarea#description").type("editDesc");
		cy.get("div#editorForm").find("button#submitEdit").click();
		cy.get("div#taskListContainer-todo")
			.find("section")
			.first()
			.should("contain", "editTitle");
	});
	it("Success edit title and date", () => {
		cy.get("div#taskListContainer-todo")
			.find("section")
			.first()
			.find("button#editButton")
			.click();
		cy.get("div#editorForm").find("input#title").type("editTitle");
		cy.get("div#editorForm").find("input#date").type("2025-04-20");
		cy.get("div#editorForm").find("button#submitEdit").click();
		cy.get("div#taskListContainer-todo")
			.find("section")
			.first()
			.should("contain", "editTitle");
		cy.get("div#taskListContainer-todo")
			.find("section")
			.first()
			.should("contain", "2025-04-20");
	});
	it("Success edit description and date", () => {
		cy.get("div#taskListContainer-todo")
			.find("section")
			.first()
			.find("button#editButton")
			.click();
		cy.get("div#editorForm").find("textarea#description").type("editDesc");
		cy.get("div#editorForm").find("input#date").type("2025-04-20");
		cy.get("div#editorForm").find("button#submitEdit").click();
		cy.get("div#taskListContainer-todo")
			.find("section")
			.first()
			.should("contain", "editDesc");
		cy.get("div#taskListContainer-todo")
			.find("section")
			.first()
			.should("contain", "2025-04-20");
	});
	it("nothing happens when all fields are empty", () => {
		cy.get("div#taskListContainer-todo")
			.find("section")
			.first()
			.find("button#editButton")
			.click();
		cy.get("div#editorForm").find("button#submitEdit").click();
		cy.get("#editorDialog");
	});
	//DELETE TASK
	// it.only("Success delete task", () => {
	// 	cy.get("div#taskListContainer-todo")
	// 		.find("section")
	// 		.first()
	// 		.find("button#editButton")
	// 		.click();
	// 	cy.get("div#editorForm").find("button#submitDelete").click();
	// 	cy.get("div#taskListContainer-todo")
	// 		.find("section")
	// 		.children()
	// 		.children()
	// 		.children()
	// 		.then((tst) => {
	// 			expect(tst.length).to.be.equal(2);
	// 		});
	// });
});
