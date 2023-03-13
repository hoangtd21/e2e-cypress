/// <reference types="Cypress" />

describe('template spec', () => {
  it('should render image', () => {
    cy.visit('http://localhost:5173/');
    cy.get('.main-header img').should('be.visible');
    // or should write: cy.get('.main-header').find('img').should('be.visible');
    // should not: cy.get('.main-header').get('img').should('be.visible');
  });

  it('should render title', () => {
    cy.visit('http://localhost:5173/');
    cy.get('h1').should('have.length', 1);
    cy.get('.main-header h1').contains('React Tasks');
  });
});
