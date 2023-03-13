/// <reference types="Cypress" />

describe('Takeaways', () => {
  beforeEach(() => {
    cy.task('seedDatabase');
  });
  it('should display a list of fetched takeaways', () => {
    cy.visit('/');
    cy.get('[data-cy="takeaway-item"]').should('be.visible');
    cy.get('[data-cy="takeaway-item"]').should('have.length', 2);
  });

  it('should create new takeaways', () => {
    cy.intercept('POST', '/takeaways/new*', 'success').as('createNewTakeaway');
    cy.loginCheck('test@example.com', 'testpassword');
    cy.visit('/takeaways/new');
    cy.get('[data-cy="title"]').click();
    cy.get('[data-cy="title"]').type('Takeaway1');
    cy.get('[data-cy="body"]').type('TakeawayOne');
    cy.get('[data-cy="create-takeaway"]').click();
    cy.wait('@createNewTakeaway')
      .its('request.body')
      .should('match', /Takeaway1.*TakeawayOne/);
  });
});
