<script lang="ts">
  import type { Link } from "../utils/types";

  export let data: Link;
</script>

<article class="border h-24 p-2 px-5 rounded border-zinc-700">
  <p class="truncate">/s/{data.slug}</p>
  <p class="truncate">
    {data.url}
  </p>
  <p class="truncate">
    {data.description}
  </p>
</article>
