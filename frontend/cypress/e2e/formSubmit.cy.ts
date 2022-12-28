/// <reference types="cypress" />

describe("Form submit", () => {
  beforeEach(() => {
    const url = Cypress.env("FRONTEND_URL");
    cy.viewport(1920, 1080);
    cy.visit(url);
  });

  it("Fills in the form and clicks 'Calculate' button", () => {
    const ticker = "AAPL";
    const amount = "100";
    const startDate = "01/20/2017";
    const intervalCount = 3;
    const intervalFrequency = "MONTHLY";

    const table = cy.get("#results-table");
    const chart = cy.get("#results-chart");

    cy.get("#ticker").clear().type(ticker);
    cy.get("#amount").clear().type(amount);
    cy.get("#start-date").clear().type(startDate);
    cy.get("#interval-count").clear().type(intervalCount.toString());
    cy.get("#interval-frequency").click();
    cy.get(`[data-value=${intervalFrequency}]`).click();
    cy.get("#calculate").click();

    const newTable = cy.get("#results-table");
    const newChart = cy.get("#results-chart");

    table.should("not.eq", newTable);
    chart.should("not.eq", newChart);
  });
});
