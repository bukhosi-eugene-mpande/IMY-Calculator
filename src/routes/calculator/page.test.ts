import { describe, it, expect } from 'vitest';
import { actions } from './+page.server';

function createMockRequest(form: Record<string, string>) {
  return {
    formData: async () => {
      const map = new Map<string, FormDataEntryValue>();
      for (const key in form) {
        map.set(key, form[key]);
      }
      return {
        get: (key: string) => map.get(key)
      };
    }
  };
}

describe('Form Action: hexCalc via form action', () => {
  it('adds two hex values correctly', async () => {
    const mockRequest = createMockRequest({
      inputA: '1A',
      inputB: '2F',
      operation: 'add'
    });

    const result = await actions.default({ request: mockRequest as any });
    expect(result.success).toBe(true);
    expect(result.result).toBe('0x0049');
  });

  it('returns error for invalid hex input', async () => {
    const mockRequest = createMockRequest({
      inputA: 'ZZ',
      inputB: '1A',
      operation: 'add'
    });

    const result = await actions.default({ request: mockRequest as any });
    expect(result.success).toBe(false);
    expect(result.error).toBe('Invalid input. Must be 1-2 digit hex.');
  });

  it('returns error for subtraction resulting in negative value', async () => {
    const mockRequest = createMockRequest({
      inputA: '10',
      inputB: '20',
      operation: 'subtract'
    });

    const result = await actions.default({ request: mockRequest as any });
    expect(result.success).toBe(false);
    expect(result.error).toBe('Negative result not allowed.');
  });

  it('returns error for division by zero', async () => {
    const mockRequest = createMockRequest({
      inputA: '20',
      inputB: '00',
      operation: 'divide'
    });

    const result = await actions.default({ request: mockRequest as any });
    expect(result.success).toBe(false);
    expect(result.error).toBe('Division by zero not allowed.');
  });

  it('returns valid result for multiplication', async () => {
    const mockRequest = createMockRequest({
      inputA: '10',
      inputB: '10',
      operation: 'multiply'
    });

    const result = await actions.default({ request: mockRequest as any });
    expect(result.success).toBe(true);
    expect(result.result).toBe('0x0100');
  });

  it('handles missing input gracefully', async () => {
    const mockRequest = createMockRequest({
      inputA: '',
      inputB: '',
      operation: 'add'
    });

    const result = await actions.default({ request: mockRequest as any });
    expect(result.success).toBe(false);
    expect(result.error).toBe('Invalid input. Must be 1-2 digit hex.');
  });
});
