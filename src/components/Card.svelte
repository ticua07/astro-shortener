<script lang="ts">
  import type { Link } from "../utils/types";
  import ExternalLinkIcon from "../components/links/ExternalLinkIcon.svelte";
  import TrashIcon from "../components/links/TrashIcon.svelte";

  export let data: Link;
  export let deleteItem: (slug: string) => Promise<void>;
</script>

<article
  class="border h-36 w-96 flex flex-row gap-1 justify-center p-4 px-4 rounded border-zinc-700"
>
  <div class="w-full">
    <div class="flex flex-row items-center gap-2">
      <h1 class="line-clamp-1 text-3xl leading-snug">
        /s/{data.slug}
      </h1>
      <a href="/s/{data.slug}">
        <ExternalLinkIcon />
      </a>
    </div>
    <p class="line-clamp-1 text-lg text-zinc-500">
      {data.url}
    </p>
    <p class="line-clamp-1 text-lg text-zinc-300">
      {data.description}
    </p>
  </div>
  <div>
    <button on:click={() => deleteItem(data.slug)}>
      <TrashIcon />
    </button>
  </div>
</article>
