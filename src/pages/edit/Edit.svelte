<script lang="ts">
  import type { Link } from "../../utils/types";

  export let url: string;
  export let data: Link;
  console.log(data);

  let link = data.url;
  let slug = data.slug;
  let description = data.description || "";
  let error = false;

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    error = false;

    const res = await fetch(
      `${url}/api/edit?url=${link}&slug=${slug}&description=${description}`
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
    <label class="text-white" for="description">Description</label>

    <input
      maxlength={100}
      bind:value={description}
      id="description"
      type="text"
      class="w-full px-2 py-1 text-white border rounded-md bg-backgroundAccent border-zinc-800"
    />
  </div>
  {#if error}
    <span class="text-red-400">Couldn't edit link</span>
  {/if}
  <button class="text-white border border-zinc-800 rounded-md w-32 py-2"
    >Edit link 🚀</button
  >
</form>
