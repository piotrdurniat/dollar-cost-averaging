/// <reference types="cypress" />

describe("Settings", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit(Cypress.env("FRONTEND_URL"));
  });

  it("Opens and closes the setting drawer", () => {
    cy.get("#open-settings").click();
    cy.get("#close-settings").click();
  });

  it("Changes theme from 'light' to 'system' to 'dark'", () => {
    cy.get("#open-settings").click();
    cy.get('[value="light"]').click();
    cy.get('[value="system"]').click();
    cy.get('[value="dark"]').click();
    cy.get("#close-settings").click();
  });

  it("Changes language from 'en' to 'pl'", () => {
    cy.get("#open-settings").click();
    cy.get('[value="en"]').click();
    cy.get('[value="pl"]').click();
    cy.get("#close-settings").click();
  });
});
