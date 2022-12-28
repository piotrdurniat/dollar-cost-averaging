/// <reference types="cypress" />

describe("Render home page", () => {
  beforeEach(() => {
    const url = Cypress.env("FRONTEND_URL");
    cy.viewport(1920, 1080);
    cy.visit(url);
  });

  it("Renders home page", () => {
    cy.get("html").should("exist");
  });
});
