import { describe, it, expect } from 'vitest';
import { hexCalc } from './arithematic';

describe('hexCalc', () => {
  it('adds two valid hex numbers', () => {
    const result = hexCalc('1A', '2F', 'add');
    expect(result.success).toBe(true);
    expect(result.result).toBe('0x0049');
  });

  it('subtracts two valid hex numbers with positive result', () => {
    const result = hexCalc('FF', '01', 'subtract');
    expect(result.success).toBe(true);
    expect(result.result).toBe('0x00FE');
  });

  it('returns error on subtraction resulting in negative number', () => {
    const result = hexCalc('10', '20', 'subtract');
    expect(result.success).toBe(false);
    expect(result.error).toBe('Negative result not allowed.');
  });

  it('multiplies two valid hex numbers', () => {
    const result = hexCalc('10', '10', 'multiply');
    expect(result.success).toBe(true);
    expect(result.result).toBe('0x0100');
  });

  it('divides two valid hex numbers and truncates result', () => {
    const result = hexCalc('10', '03', 'divide');
    expect(result.success).toBe(true);
    expect(result.result).toBe('0x0005');
  });

  it('returns error when dividing by zero', () => {
    const result = hexCalc('10', '00', 'divide');
    expect(result.success).toBe(false);
    expect(result.error).toBe('Division by zero not allowed.');
  });

  it('returns error on invalid hex input', () => {
    const result = hexCalc('ZZ', '1F', 'add');
    expect(result.success).toBe(false);
    expect(result.error).toBe('Invalid input. Must be 1-2 digit hex.');
  });

  it('returns error if input exceeds 0xFF', () => {
    const result = hexCalc('1FF', '01', 'add');
    expect(result.success).toBe(false);
    expect(result.error).toBe('Invalid input. Must be 1-2 digit hex.');
  });

  it('allows results up to 0xFFFF (max 65535)', () => {
    const result = hexCalc('FF', 'FF', 'multiply');
    expect(result.success).toBe(true);
    expect(result.result).toBe('0xFE01');
  });
  
  it('returns proper formatted hex string result', () => {
    const result = hexCalc('1', '1', 'add');
    expect(result.result).toBe('0x0002');
  });

  it('pads input values correctly in result', () => {
    const result = hexCalc('1', '2', 'add');
    expect(result.inputA).toBe('0x01');
    expect(result.inputB).toBe('0x02');
  });
});
