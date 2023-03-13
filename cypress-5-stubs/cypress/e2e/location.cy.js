/// <reference types="cypress" />

describe('share location', () => {
  beforeEach(() => {
    cy.clock();
    cy.fixture('user-location.json').as('userLocation');
    cy.get('@userLocation').then((fakePosition) => {
      cy.visit('/').then((win) => {
        cy.stub(win.navigator.geolocation, 'getCurrentPosition')
          .as('getUserLocation')
          .callsFake((cb) => {
            setTimeout(() => {
              cb(fakePosition);
            }, 100);
          });

        cy.stub(win.navigator.clipboard, 'writeText')
          .as('saveToClipboard')
          .resolves();

        cy.spy(win.localStorage, 'setItem').as('storeLocation');
        cy.spy(win.localStorage, 'getItem').as('getStoredLocation');
      });
    });
  });
  it('should fetch the user location', () => {
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('@getUserLocation').should('have.been.called');
    cy.get('[data-cy="get-loc-btn"]').should('be.disabled');
    cy.get('[data-cy="actions"]').should('contain', 'Location fetched!');
  });

  it('should share localtion URL', () => {
    cy.get('[data-cy="name-input"]').type('Hoang Tran');
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get('@saveToClipboard').should('have.been.called');
    cy.get('@userLocation').then((fakePosition) => {
      const { latitude, longitude } = fakePosition.coords;
      cy.get('@saveToClipboard').should(
        'have.been.calledWithMatch',
        new RegExp(`${latitude}.*${longitude}.*${encodeURI('Hoang Tran')}`)
      );

      cy.get('@storeLocation').should(
        'have.been.calledWithMatch',
        /Hoang Tran/,
        new RegExp(`${latitude}.*${longitude}.*${encodeURI('Hoang Tran')}`)
      );
    });

    cy.get('@storeLocation').should('have.been.called');
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get('@getStoredLocation').should('have.been.called');

    // show popup message when click share link btn
    cy.get('[data-cy="info-message"]').should('be.visible');
    cy.get('[data-cy="info-message"]').should('have.class', 'visible');

    // popup will not show after 2s, but time default of cypress is 4s => not cause err but not good => use cy.clock() + cy .tick()
    cy.tick(2000);
    cy.get('[data-cy="info-message"]').should('not.be.visible');
  });
});
