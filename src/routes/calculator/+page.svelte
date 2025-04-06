<svelte:head>
    <title>Calculator</title>
    <meta name="description" content="Hexadecimal calculator" />
</svelte:head>

<script lang="ts">
    export let form: any;
</script>
  
<div class="text-column">
    <h1>Hexadecimal Calculator</h1>
  
    <p>
      This is a simple hexadecimal calculator that takes in 2 inputs in hexadecimal form and returns the result up to a maximum of 4 digits.
    </p> 
  
    <form method="POST">
      <label class="p-2">
        Hex Input A:
        <input class="rounded-full" type="text" name="inputA" maxlength="2" required />
      </label><br><br>
      
      <label class="p-2">
        Hex Input B:
        <input class="rounded-full" type="text" name="inputB" maxlength="2" required />
      </label><br><br>
      
      <label class="p-2">
        Operation:
        <select class="rounded-full" name="operation" required>
          <option value="add">Add (+)</option>
          <option value="subtract">Subtract (-)</option>
          <option value="multiply">Multiply (×)</option>
          <option value="divide">Divide (÷)</option>
        </select>
      </label><br><br>
  
      <button
        class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="submit"
       >
       Calculate
     </button>
    </form>
  
    {#if form?.result}
      <div class="result">
        ✅ Result: {form.result}
      </div>
    {/if}
  
    {#if form?.error}
      <div class="error">
        ❌ Error: {form.error}
      </div>
    {/if}
</div>
  