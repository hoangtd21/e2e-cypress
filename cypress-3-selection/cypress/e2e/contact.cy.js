/// <reference types="Cypress" />

describe('contact form', () => {
  it('should submit the form', () => {
    cy.visit('http://localhost:5173/about');
    cy.get('#message').type(
      ' We have created this demo to help you learn how to use Cypress.'
    );
    cy.get('#name').type('HoangTD');
    cy.get('#email').type('HoangTD@gmail.com');
    cy.get('[data-cy="contact-btn-submit"]')
      .contains('Send Message')
      .should('not.have.attr', 'disabled');
    cy.get('[data-cy="contact-btn-submit"]').as('submitBtn');
    cy.get('@submitBtn').click();
    cy.get('@submitBtn').contains('Sending...');
  });

  it('should validate the form input', () => {
    cy.visit('http://localhost:5173/about');
    cy.get('[data-cy="contact-btn-submit"]').click();
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el).to.not.have.attr('disabled');
      expect(el.text()).to.not.equal('Sending...');
    });
    cy.get('[data-cy="contact-btn-submit"]').contains('Send Message');

    // Check not input in message field
    cy.get('[data-cy="contact-input-message"]').as('msgInput');
    cy.get('@msgInput').focus().blur();
    cy.get('@msgInput')
      .parent()
      .should('have.attr', 'class')
      .and('match', /invalid/);

    cy.get('[data-cy="contact-input-name"]').as('nameInput');
    cy.get('@nameInput').focus().blur();

    // Run success in Cypress studio, but fail when use npx cypress run => use should() instead of then()
    // cy.get('@nameInput')
    //   .parent()
    //   .then((el) => {
    //     expect(el.attr('class')).to.contains('invalid');
    //   });

    // Use it:
    cy.get('@nameInput')
      .parent()
      .should('have.attr', 'class')
      .and('match', /invalid/);

    cy.get('[data-cy="contact-input-email"]').as('emailInput');
    cy.get('[data-cy="contact-input-email"]').focus().blur();
    cy.get('[data-cy="contact-input-email"]')
      .parent()
      .should('have.attr', 'class')
      .and('match', /invalid/);
  });
});
