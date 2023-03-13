/// <reference types="Cypress" />

describe('auth', () => {
  beforeEach(() => {
    cy.task('seedDatabase');
  });
  it('should sign up', () => {
    cy.visit('/signup');
    cy.get('[data-cy="auth-email"]').click();
    cy.get('[data-cy="auth-email"]').type('hoangtran@gmail.com');
    cy.get('[data-cy="auth-password"]').type('Welcome@123');
    cy.get('[data-cy="auth-submit"]').click();
    cy.location('pathname').should('eq', '/takeaways');
    cy.getCookie('__session').its('value').should('not.be.empty');
  });

  it('should login', () => {
    // cy.visit('/login');
    // cy.get('[data-cy="auth-email"]').click();
    // cy.get('[data-cy="auth-email"]').type('test@example.com');
    // cy.get('[data-cy="auth-password"]').type('testpassword');
    // cy.get('[data-cy="auth-submit"]').click();
    // cy.location('pathname').should('eq', '/takeaways');
    // cy.getCookie('__session').its('value').should('not.be.empty');

    cy.loginCheck('test@example.com', 'testpassword');
  });

  it('should logout', () => {
    // Option 1: Normal
    // cy.visit('/login');
    // cy.get('[data-cy="auth-email"]').click();
    // cy.get('[data-cy="auth-email"]').type('test@example.com');
    // cy.get('[data-cy="auth-password"]').type('testpassword');
    // cy.get('[data-cy="auth-submit"]').click();
    // cy.location('pathname').should('eq', '/takeaways');
    // cy.getCookie('__session').its('value').should('not.be.empty');

    // Option 2: Use custom login command
    cy.loginCheck('test@example.com', 'testpassword');

    // Logout
    cy.contains('button', 'Logout').should('be.visible');
    cy.contains('button', 'Logout').click();
    cy.location('pathname').should('eq', '/');
    cy.getCookie('__session').its('value').should('be.empty');
  });
});
