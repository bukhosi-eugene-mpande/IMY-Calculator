// +page.svelte.test.ts
import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Page from './+page.svelte';
import '@testing-library/jest-dom/vitest';

describe('Calculator Page', () => {
  beforeEach(() => {
    render(Page, { props: { form: {} } });
  });

  test('should render the main heading', () => {
    expect(
      screen.getByRole('heading', { name: 'Hexadecimal Calculator', level: 1 })
    ).toBeInTheDocument();
  });

  test('should render all hex digit buttons', () => {
    const hexDigits = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
    const display = screen.getByTestId('btn-grid');
    hexDigits.forEach(digit => {
      expect(display).toHaveTextContent(digit);
    });
  });

  test('should update display when entering digits for input A', async () => {
    const buttonA = screen.getByRole('button', { name: 'A' });
    await fireEvent.click(buttonA);
    
    const display = document.querySelector('.text-2xl.font-mono');
    expect(display).toHaveTextContent('A');
  });

  test('should switch to input B after selecting operation', async () => {
    await fireEvent.click(screen.getByText('1'));
    await fireEvent.click(screen.getByText('+'));
    
    const stateDisplay = document.querySelector('.text-gray-600.text-sm');
    expect(stateDisplay).toHaveTextContent('Entering B');
  });

  test('should clear all inputs with C button', async () => {
    await fireEvent.click(screen.getByText('1'));
    await fireEvent.click(screen.getByText('+'));
    await fireEvent.click(screen.getByTestId('clear-all-btn'));
    
    const display = document.querySelector('.text-2xl.font-mono');
    const display2 = document.querySelector('.text-gray-600.text-sm.h-6')
    expect(display).toHaveTextContent('0');
    expect(display2).toHaveTextContent('Entering A');
  });

  test('should show error message when form has error', async () => {
    render(Page, { 
      props: { 
        form: { error: 'Test error message' } 
      } 
    });
    
    expect(screen.getByText('⚠️ Test error message')).toBeInTheDocument();
  });

  test('should show result when form has result', async () => {
    render(Page, { 
      props: { 
        form: { result: '1A3F' } 
      } 
    });
    
    expect(screen.getByText('Result: 1A3F')).toBeInTheDocument();
  });

  test('should update hidden form fields when inputs change', async () => {
    await fireEvent.click(screen.getByText('A'));
    await fireEvent.click(screen.getByText('+'));
    await fireEvent.click(screen.getByText('B'));
    
    const form = screen.getByTestId('hex-form');
    expect(form.querySelector('input[name="inputA"]')).toHaveValue('A');
    expect(form.querySelector('input[name="inputB"]')).toHaveValue('B');
    expect(form.querySelector('input[name="operation"]')).toHaveValue('add');
  });

  test('should prevent invalid digit input', async () => {
    // Should only allow 2 digits per input
    await fireEvent.click(screen.getByText('1'));
    await fireEvent.click(screen.getByText('2'));
    await fireEvent.click(screen.getByText('3')); // Should be ignored
    
    const inputA = document.querySelector('input[name="inputA"]');
    expect(inputA).toHaveValue('12');
  });

  test('should show correct operator symbols', async () => {
    await fireEvent.click(screen.getByText('1'));
    await fireEvent.click(screen.getByText('+'));
    const display = document.querySelector('.text-2xl.font-mono');
    expect(display).toHaveTextContent('+');
  });
});
