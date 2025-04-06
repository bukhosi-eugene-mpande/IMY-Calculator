import type { Actions } from './$types';
import { hexCalc } from '$lib/server/services/arithematic'; // adjust this path as needed

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const inputA = formData.get('inputA')?.toString().toUpperCase() ?? '';
    const inputB = formData.get('inputB')?.toString().toUpperCase() ?? '';
    const operation = formData.get('operation')?.toString() as
      | 'add'
      | 'subtract'
      | 'multiply'
      | 'divide';

    const result = hexCalc(inputA, inputB, operation);

    return {
      ...result
    };
  }
};
