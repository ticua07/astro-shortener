<script lang="ts">
  import type { Link } from "../utils/types";
  import Card from "./Card.svelte";
  import Spinner from "./Spinner.svelte";

  export let url: string;
  let data: Link[] = [];
  let loading = true;
  let tooltip = false;
  let tooltipText = "";

  const fetchData = async () => {
    const res = await fetch(`${url}/api/slugs`);
    const json: Link[] = await res.json();
    data = json;
    loading = false;
  };

  const deleteItem = async (slug: string) => {
    data = data.filter((el) => el.slug !== slug);
    await fetch(`${url}/api/delete?slug=${slug}`);
    activeTooltip("Deleted link");
  };

  const activeTooltip = (text: string) => {
    tooltip = true;
    tooltipText = text;
    console.log(tooltipText);
    setTimeout(() => {
      tooltip = false;
    }, 1500);
  };

  fetchData();
</script>

<div
  class="absolute invisible lg:visible top-0 left-1/2 -translate-x-1/2 tooltip shadow-lg shadow-zinc-950 border-zinc-800 border rounded-md px-1 max-w-48 w-3/12 py-2 flex justify-center items-center {tooltip
    ? 'active'
    : ''}"
>
  <p class="text-white">{tooltipText}</p>
</div>

{#if !loading}
  <section
    class="text-white justify-center sm:w-[40rem] lg:w-3/4 sm:px-2 px-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-2"
  >
    {#each data as short}
      <Card {deleteItem} {activeTooltip} data={short} />
    {/each}
  </section>
{:else}
  <!-- <h1 class="text-3xl text-white">Loading</h1> -->
  <section class="flex justify-center">
    <Spinner />
  </section>
{/if}

<style>
  .tooltip {
    opacity: 0;
    transition:
      opacity 0.5s ease,
      transform 0.5s ease;
  }

  .tooltip.active {
    opacity: 1;
    transform: translate(-50%, 10px);
  }
</style>
