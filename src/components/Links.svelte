<script lang="ts">
  import type { Link } from "../utils/types";
  import Card from "./Card.svelte";
  import Spinner from "./Spinner.svelte";

  export let url: string;
  let data: Link[] = [];
  let loading = true;

  const fetchData = async () => {
    const res = await fetch(`${url}/api/slugs`);
    const json: Link[] = await res.json();
    console.log(json);
    data = json;
    loading = false;
  };

  const deleteItem = async (slug: string) => {
    data = data.filter((el) => el.slug !== slug);
    await fetch(`${url}/api/delete?slug=${slug}`);
  };

  fetchData();
</script>

{#if !loading}
  <section
    class="text-white justify-center sm:w-[40rem] lg:w-3/4 sm:px-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2"
  >
    {#each data as short}
      <Card {deleteItem} data={short} />
    {/each}
  </section>
{:else}
  <!-- <h1 class="text-3xl text-white">Loading</h1> -->
  <section class="flex justify-center">
    <Spinner />
  </section>
{/if}
