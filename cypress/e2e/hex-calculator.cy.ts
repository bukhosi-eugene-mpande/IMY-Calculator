// cypress/e2e/hex-calculator.cy.ts
describe('Hexadecimal Calculator Tests', () => {
  beforeEach(() => {
    cy.visit('/calculator');
    cy.get('[data-testid="clear-all-btn"]').click();
  });

  it('should load the calculator page', () => {
    cy.get('h1').should('contain', 'Hexadecimal Calculator');
    cy.get('[data-testid="btn-grid"]').should('be.visible');
  });

  it('should input hex digits for operand A', () => {
    cy.contains('button', 'A').click();
    cy.contains('button', 'F').click();
    cy.get('[data-testid="hex-calc-display"]').should('contain', 'AF');
  });

  it('should switch to input B after selecting operation', () => {
    cy.contains('button', '1').click();
    cy.contains('button', '+').click();
    cy.get('.text-gray-600.text-sm').should('contain', 'Entering B');
  });

  it('should input hex digits for operand B', () => {
    cy.contains('button', '1').click();
    cy.contains('button', '+').click();
    cy.contains('button', 'F').click();
    cy.get('.text-2xl.font-mono').should('contain', '1 + F');
  });

  it('should clear all inputs with C button', () => {
    cy.contains('button', 'A').click();
    cy.contains('button', '+').click();
    cy.contains('button', 'F').click();
    cy.get('[data-testid="clear-all-btn"]').click();
    cy.get('.text-2xl.font-mono').should('contain', '0');
  });

  it('should prevent more than 2 digits per operand', () => {
    cy.contains('button', '1').click();
    cy.contains('button', '2').click();
    cy.contains('button', '3').click(); // Should be ignored
    cy.get('input[name="inputA"]').should('have.value', '12');
  });

  it('should show error message for invalid operation', () => {

    cy.contains('button', '=').click();
    cy.get('[data-testid="error-display"]').should('contain', 'Invalid input');
  });

  it('should show calculation result', () => {
    cy.contains('button', 'A').click();
    cy.contains('button', '+').click();
    cy.contains('button', 'F').click();
    cy.contains('button', '=').click();
    
    cy.get('[data-testid="hex-calc-result-display"]').should('contain', 'Result: 0x0019');
  });

  it('should handle all operations', () => {
    const operations = [
      { symbol: '+', value: 'add' },
      { symbol: '-', value: 'subtract' },
      { symbol: 'x', value: 'multiply' },
      { symbol: '÷', value: 'divide' }
    ];

    operations.forEach((op) => {
      cy.contains('button', 'C').click();
      cy.contains('button', 'A').click();
      cy.contains('button', op.symbol).click();
      cy.contains('button', 'F').click();
      cy.get('input[name="operation"]').should('have.value', op.value);
      cy.get('.text-2xl.font-mono').should('contain', op.symbol);
    });
  });

  it('should update form hidden fields correctly', () => {
    cy.contains('button', 'A').click();
    cy.contains('button', '+').click();
    cy.contains('button', 'F').click();
    
    cy.get('input[name="inputA"]').should('have.value', 'A');
    cy.get('input[name="inputB"]').should('have.value', 'F');
    cy.get('input[name="operation"]').should('have.value', 'add');
  });
});