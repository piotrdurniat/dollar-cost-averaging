/// <reference types="cypress" />

describe("Form validation", () => {
  beforeEach(() => {
    const url = Cypress.env("FRONTEND_URL");
    cy.viewport(1920, 1080);
    cy.visit(url);
  });

  it("Fills in the form with empty ticker", () => {
    cy.get("#ticker").clear().blur();

    cy.get("#calculate").should("be.disabled");
    cy.get("#ticker-helper-text").should("not.be.empty");
  });

  it("Fills in the form with incorrect amount", () => {
    const ticker = "AAPL";
    const amount = "abc";

    cy.get("#ticker").clear().type(ticker);
    cy.get("#amount").clear().type(amount);

    cy.get("#calculate").should("be.disabled");
    cy.get("#amount-helper-text").should("not.be.empty");
  });

  it("Fills in the form with incorrect start date", () => {
    const ticker = "AAPL";
    const amount = "100";
    const startDate = "abc";

    cy.get("#ticker").clear().type(ticker);
    cy.get("#amount").clear().type(amount);
    cy.get("#start-date").clear().type(startDate);

    cy.get("#calculate").should("be.disabled");
    cy.get("#start-date-helper-text").should("not.be.empty");
  });

  it("Fills in the form with incorrect interval count", () => {
    const ticker = "AAPL";
    const amount = "100";
    const startDate = "01/20/2017";
    const intervalCount = -1;

    cy.get("#ticker").clear().type(ticker);
    cy.get("#amount").clear().type(amount);
    cy.get("#start-date").clear().type(startDate);
    cy.get("#interval-count").clear().type(intervalCount.toString());

    cy.get("#calculate").should("be.disabled");
    cy.get("#interval-count-helper-text").should("not.be.empty");
  });
});
