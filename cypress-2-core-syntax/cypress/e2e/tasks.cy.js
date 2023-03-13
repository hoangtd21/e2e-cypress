/// <reference types="Cypress" />

describe('task spec', () => {
  it('should open and close modal', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();
    cy.get('.backdrop').click({ force: true });
    cy.get('.backdrop').should('not.exist');
    cy.get('.modal').should('not.exist');

    cy.contains('Add Task').click();
    cy.contains('Cancel').click();
    cy.get('.backdrop').should('not.exist');
    cy.get('.modal').should('not.exist');
  });

  it('should render list when user add task', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-cy="start-add-task-button"]').click();

    // task modal shown
    cy.get('#title').type('My Task 1');
    cy.get('#summary').type('Learning React, Cypress for E2E testing');
    cy.get('#category').select('important');
    cy.get('.modal').contains('Add Task').click();

    // not close modal
    cy.get('.backdrop').should('not.exist');
    cy.get('.modal').should('not.exist');

    // task list shown
    cy.get('.task').should('have.length', 1);
    cy.get('.task h2').contains('My Task 1');
    cy.get('.task p').contains('Learning React, Cypress for E2E testing');
  });

  it('should validate user input', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();
    cy.get('.modal').contains('Add Task').click();
    cy.get('.error-message').contains(
      'Please provide values for task title, summary and category!'
    );
  });

  it('should filter tasks', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();
    cy.get('#title').type('My Task 1');
    cy.get('#summary').type('Learning React, Cypress for E2E testing');
    cy.get('#category').select('important');
    cy.get('.modal').contains('Add Task').click();
    cy.get('.task').should('have.length', 1);
    cy.get('#filter').select('urgent');
    cy.get('.task').should('have.length', 0);
  });

  it('should render multi tasks', () => {
    cy.visit('http://localhost:5173/');

    // ADD task 1
    cy.contains('Add Task').click();
    cy.get('#title').type('Task 1');
    cy.get('#summary').type('First task');
    cy.get('.modal').contains('Add Task').click();
    cy.get('.task').should('have.length', 1);

    // ADD task 2
    cy.contains('Add Task').click();
    cy.get('#title').type('Task 2');
    cy.get('#summary').type('Second task');
    cy.get('.modal').contains('Add Task').click();
    cy.get('.task').should('have.length', 2);

    cy.get('.task').eq(0).contains('First task');
    cy.get('.task').eq(1).contains('Second task');
  });
});
