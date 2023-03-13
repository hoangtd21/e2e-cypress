/// <reference types="Cypress" />

describe('News letter', () => {
  beforeEach(() => {
    cy.task('seedDatabase');
  });

  it('should display success message', () => {
    // intercept HTTP request
    cy.intercept('POST', '/newsletter*', { status: 201 });
    cy.visit('/');
    cy.get('[data-cy="newsletter-email"]').type('test123@example.com', {
      force: true,
    });
    cy.get('[data-cy="newsletter-submit"]').click();
    cy.contains('Thanks for signing up');
  });

  it('should display error message', () => {
    // intercept HTTP request
    cy.intercept('POST', '/newsletter*', { message: 'Email exists already.' });
    cy.visit('/');
    cy.get('[data-cy="newsletter-email"]').type('test123@example.com');
    cy.get('[data-cy="newsletter-submit"]').click();
    cy.contains('Email exists already.');
  });

  it('should create successfully new contact', () => {
    cy.request({
      method: 'POST',
      url: '/newsletter',
      body: { email: 'hoangtest@gmail.com' },
      form: true,
    }).then((res) => expect(res.status).to.eq(201));
  });
});
