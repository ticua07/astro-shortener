<script lang="ts">
  export let url: string;
  let link: string;
  let slug: string;
  let description: string = "";
  let error = false;

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    error = false;

    const res = await fetch(
      `${url}/api/create?url=${link}&slug=${slug}&description=${description}`
    );
    const data = await res.json();

    if (!data.success) {
      error = true;
    } else {
      window.location.href = `${url}/dashboard`;
    }
  };
</script>

<form on:submit={onSubmit} class="max-w-md p-3 mx-auto flex flex-col gap-4">
  <div class="flex flex-col gap-1">
    <label for="link" class="text-white">Link:</label>

    <input
      bind:value={link}
      id="link"
      type="url"
      class="w-full px-2 py-1 text-white border rounded-md bg-backgroundAccent border-zinc-800"
      placeholder="https://example.net"
    />
  </div>
  <div class="flex flex-col gap-1">
    <label class="text-white" for="slug">
      Custom slug:
      <span class="text-gray-500">(https://link.ticua.ar/s/{slug || ""})</span>
    </label>

    <input
      bind:value={slug}
      id="slug"
      type="text"
      class="w-full px-2 py-1 text-white border rounded-md bg-backgroundAccent border-zinc-800"
      placeholder="Custom slug"
    />
  </div>
  <div class="flex flex-col gap-1">
    <label class="text-white" for="description"
      >Description (not required):</label
    >

    <input
      maxlength={100}
      bind:value={description}
      id="description"
      type="text"
      class="w-full px-2 py-1 text-white border rounded-md bg-backgroundAccent border-zinc-800"
    />
  </div>
  {#if error}
    <span class="text-red-400">Couldn't add slug</span>
  {/if}
  <button class="text-white border border-zinc-800 rounded-md w-32 py-2"
    >Add link 🚀</button
  >
</form>
