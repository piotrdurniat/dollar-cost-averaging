/// <reference types="cypress" />

describe("Home", () => {
  beforeEach(() => {
    const url = Cypress.env("FRONTEND_URL");
    cy.viewport(1920, 1080);
    cy.visit(url);
  });

  it("Renders home page", () => {
    cy.get("html").should("exist");
  });

  it("Selects ticker symbol from autocomplete list", () => {
    const searchQuery = "apple";
    const resultTicker = "AAPL";

    cy.get("#ticker").clear().type(searchQuery);
    cy.get("#ticker-option-0").click();
    cy.get("#ticker").should("have.value", resultTicker);
  });
});
