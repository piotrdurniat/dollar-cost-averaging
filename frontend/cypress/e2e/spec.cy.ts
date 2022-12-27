/// <reference types="cypress" />

describe("empty spec", () => {
  beforeEach(() => {
    const url = Cypress.env("FRONTEND_URL");
    cy.viewport(1920, 1080);
    cy.visit(url);
  });

  it("passes", () => {
    expect(true).to.equal;
  });
});
