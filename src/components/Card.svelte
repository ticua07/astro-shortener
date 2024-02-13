<script lang="ts">
  import type { Link } from "../utils/types";
  import ExternalLinkIcon from "../components/links/ExternalLinkIcon.svelte";
  import TrashIcon from "../components/links/TrashIcon.svelte";

  export let data: Link;
  export let deleteItem: (slug: string) => Promise<void>;
</script>

<article
  class="border w-full flex flex-row gap-1 justify-center p-4 px-4 rounded border-zinc-700"
>
  <div class="w-full">
    <a
      href="/s/{data.slug}"
      class="flex flex-row gap-2 items-center line-clamp-1 text-xl leading-snug"
    >
      /s/{data.slug}
    </a>
    <p class="line-clamp-1 text-lg text-zinc-500">
      {data.url}
    </p>
    <p class="line-clamp-1 text-lg text-zinc-300">
      {data.description || ""}
    </p>
  </div>
  <div>
    <button aria-label="Delete slug" on:click={() => deleteItem(data.slug)}>
      <TrashIcon />
    </button>
  </div>
</article>
