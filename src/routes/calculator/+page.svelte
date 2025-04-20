<svelte:head>
  <title>Hexadecimal Calculator</title>
  <meta name="description" content="Mobile-friendly hexadecimal calculator with full button interface" />
</svelte:head>

<script lang="ts">
  import { enhance } from '$app/forms';

  export let form: any; // Use standard prop declaration
  let inputA = form?.inputA || '';
  let inputB = form?.inputB || '';
  let operation = form?.operation || null;
  let activeInput: 'A' | 'B' = operation ? 'B' : 'A';

  const hexDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

  function handleDigit(digit: string) {
    if (activeInput === 'A' && inputA.length < 2) {
      inputA += digit;
    } else if (activeInput === 'B' && inputB.length < 2) {
      inputB += digit;
    }
  }

  function setOperation(op: string) {
    if (inputA === '') return;
    operation = op;
    activeInput = 'B';
  }

  function clearAll() {
    inputA = '';
    inputB = '';
    operation = null;
    activeInput = 'A';
    form = null;
  }
</script>
  
<div class="min-h-screen p-4">
  <div class="max-w-xs mx-auto bg-white rounded-2xl shadow-lg p-4">
    <h1 class="text-xl font-bold text-center mb-4">Hexadecimal Calculator</h1>

    <!-- Display area -->
    <div data-testid="hex-calc-display" class="bg-gray-50 rounded-lg p-3 mb-4">
      <div class="text-gray-600 text-sm h-6">
        {activeInput === 'A' ? 'Entering A' : 'Entering B'}
      </div>
      <div class="text-2xl font-mono h-12 flex items-center justify-end">
        {inputA || '0'} 
        {#if operation}
          {@const operator = { add: '+', subtract: '-', multiply: 'x', divide: '÷' }[operation]}
          {operator}
        {/if}
        {inputB}
      </div>
      <div data-testid="hex-calc-result-display" class="text-right text-sm text-gray-600">
        {#if form?.result}Result: {form.result}{/if}
      </div>
    </div>

    {#if form?.error}
      <div data-testid="error-display" class="text-red-500 text-sm mb-2">⚠️ {form.error}</div>
    {/if}

    <!-- Buttons grid -->
    <div data-testid="btn-grid" class="grid grid-cols-4 gap-2">
      {#each hexDigits as digit}
        <button
          type="button"
          class="p-3 bg-blue-100 hover:bg-blue-200 rounded-lg font-mono"
          on:click={() => handleDigit(digit)}
        >
          {digit}
        </button>
      {/each}

      <button type="button" class="bg-yellow-400 hover:bg-yellow-500 rounded-lg" on:click={() => setOperation('add')}>+</button>
      <button type="button" class="bg-yellow-400 hover:bg-yellow-500 rounded-lg" on:click={() => setOperation('subtract')}>-</button>
      <button type="button" class="bg-yellow-400 hover:bg-yellow-500 rounded-lg" on:click={() => setOperation('multiply')}>x</button>
      <button type="button" class="bg-yellow-400 hover:bg-yellow-500 rounded-lg" on:click={() => setOperation('divide')}>÷</button>

      <button type="button" class="col-span-2 bg-red-400 hover:bg-red-500 rounded-lg" data-testid="clear-all-btn" on:click={clearAll}>C</button>
    </div>

    <!-- Enhanced form -->
    <form method="POST" use:enhance data-testid="hex-form">
      <input type="hidden" name="inputA" value={inputA} />
      <input type="hidden" name="inputB" value={inputB} />
      <input type="hidden" name="operation" value={operation} />

      <div class="grid grid-cols-4 gap-2 pt-2">
        <button type="submit" class="col-span-4 bg-green-400 hover:bg-green-500 rounded-lg">=</button>
      </div>
    </form>

    <p class="text-sm text-gray-600 mt-4 text-center">
      Max 2-digit inputs, 4-digit result display
    </p>
  </div>
</div>
  