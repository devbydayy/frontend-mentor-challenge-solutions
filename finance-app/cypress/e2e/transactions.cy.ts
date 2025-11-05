
describe('Transactions Page (E2E Test)', () => {
  beforeEach(() => {
    cy.login('user@example.com', 'password');
    cy.visit('/transactions');
  });

  it('should search and filter the transaction list', () => {
    cy.get('input[placeholder="Search transactions"]').type('Spark');
    cy.contains('Spark Electric Solutions').should('be.visible');
    cy.contains('Savory Bites Bistro').should('not.exist');
    cy.contains('Emma Richardson').should('not.exist');
  });

  it('should sort the list by amount', () => {
    cy.get('[data-testid="sort-menu-button"]').click();
    cy.get('li[data-value="amount-asc"]').click();
    cy.get('[data-testid="transaction-row"]').first()
      .contains('Pixel Playground');
  });
});
