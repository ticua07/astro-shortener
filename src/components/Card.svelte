<script lang="ts">
  import type { Link } from "../utils/types";
  import ExternalLinkIcon from "../components/links/ExternalLinkIcon.svelte";

  export let data: Link;
</script>

<article
  class="border w-full h-36 flex flex-col gap-1 justify-center p-4 px-4 rounded border-zinc-700"
>
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
  <p class="line-clamp-1 text-lg">
    {data.description}
  </p>
</article>
