/// <reference types="cypress" />

describe("Autocomplete", () => {
  beforeEach(() => {
    const url = Cypress.env("FRONTEND_URL");
    cy.viewport(1920, 1080);
    cy.visit(url);
  });

  it("Types stock name and sele selects ticker symbol from autocomplete list", () => {
    const searchQuery = "apple";
    const resultTicker = "AAPL";

    cy.get("#ticker").clear().type(searchQuery);
    cy.get("#ticker-option-0").click();

    cy.get("#ticker").should("have.value", resultTicker);
  });
});
