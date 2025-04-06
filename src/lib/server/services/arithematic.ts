import type { HexCalcResult } from '$lib/server/types'
type HexOperation = 'add' | 'subtract' | 'multiply' | 'divide';

function isValidHex2Digit(input: string): boolean {
  return /^[0-9A-Fa-f]{1,2}$/.test(input);
}

export function hexCalc(
  inputA: string,
  inputB: string,
  operation: HexOperation
): HexCalcResult {
  // Input validation
  if (!isValidHex2Digit(inputA) || !isValidHex2Digit(inputB)) {
    return { success: false, error: "Invalid input. Must be 1-2 digit hex.", inputA, inputB };
  }

  const numA = parseInt(inputA, 16);
  const numB = parseInt(inputB, 16);

  if (numA > 0xFF || numB > 0xFF) {
    return { success: false, error: "Input exceeds 2-digit hex range (0x00–0xFF).", inputA, inputB };
  }

  let resultNum: number;

  switch (operation) {
    case 'add':
      resultNum = numA + numB;
      break;
    case 'subtract':
      resultNum = numA - numB;
      if (resultNum < 0) {
        return { success: false, error: "Negative result not allowed.", inputA, inputB };
      }
      break;
    case 'multiply':
      resultNum = numA * numB;
      break;
    case 'divide':
      if (numB === 0) {
        return { success: false, error: "Division by zero not allowed.", inputA, inputB };
      }
      resultNum = Math.floor(numA / numB); // Truncate decimal
      break;
    default:
      return { success: false, error: "Unknown operation.", inputA, inputB };
  }

  // Clamp result to 4-digit hex
  if (resultNum > 0xFFFF) {
    return { success: false, error: "Output exceeds 4-digit hex limit (0x0000–0xFFFF).", inputA, inputB };
  }

  const hexResult = resultNum.toString(16).toUpperCase().padStart(4, '0');

  return {
    success: true,
    result: `0x${hexResult}`,
    inputA: `0x${numA.toString(16).toUpperCase().padStart(2, '0')}`,
    inputB: `0x${numB.toString(16).toUpperCase().padStart(2, '0')}`,
  };
}
