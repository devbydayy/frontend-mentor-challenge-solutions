describe('Authentication Flow', () => {
  it('should navigate to the login page', () => {
    cy.visit('/');
    cy.url().should('include', '/login');
    cy.contains('h2', 'Login').should('be.visible');
  });

  it('should allow a demo user to log in and see the overview page', () => {
    cy.visit('/login');
    cy.contains('a', 'Login with demo').click();
    cy.url().should('include', '/overview');
    cy.contains('h4', 'Overview').should('be.visible');
  });
});
