<script lang="ts">
  import type { Link } from "../utils/types";
  import EditIcon from "../components/links/EditIcon.svelte";
  import TrashIcon from "../components/links/TrashIcon.svelte";
  import CopyIcon from "../components/links/CopyIcon.svelte";

  export let data: Link;
  export let deleteItem: (slug: string) => Promise<void>;

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(`https://link.ticua.ar/s/${data.slug}`);
  };
</script>

<article
  class="border w-full flex flex-row gap-1 justify-center p-4 px-4 rounded border-zinc-700"
>
  <div class="w-full">
    <div class="flex items-center gap-2">
      <a href="/s/{data.slug}" class="line-clamp-1 text-xl leading-snug w-min">
        /s/{data.slug}
      </a>
      <button
        on:click={copyLinkToClipboard}
        class="active:scale-90 transition-transform duration-100"
      >
        <CopyIcon />
      </button>
    </div>
    <p class="line-clamp-1 text-lg text-zinc-500">
      {data.url}
    </p>
    <p class="line-clamp-1 text-lg text-zinc-300">
      {data.description || ""}
    </p>
  </div>
  <div class="flex flex-col justify-between items-center">
    <button
      aria-label="Delete slug"
      class="opacity-70 hover:opacity-100 transition-opacity duration-200"
      on:click={() => deleteItem(data.slug)}
    >
      <TrashIcon />
    </button>
    <a
      class="opacity-70 hover:opacity-100 transition-opacity duration-200"
      aria-label="Edit slug"
      href="/edit/{data.slug}"
    >
      <EditIcon />
    </a>
  </div>
</article>
