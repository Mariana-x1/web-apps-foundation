/// <reference types="cypress" />

describe("todo app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("should exist", () => {
    cy.visit("http://localhost:3000");
  });
  it("should have empty todo list by default", () => {
    cy.get("#todo-list li").should("have.length", 0);
  });
  it("should create new todo", () => {
    cy.get("#new-todo").type("Learn Html");
    cy.get("#add-todo").click();
    cy.get("#todo-list li").should("have.length", 1);
  });
});
