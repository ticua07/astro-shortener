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
  {#each data as short}
    <section
      class="text-white px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
    >
      <Card {deleteItem} data={short} />
    </section>
  {/each}
{:else}
  <!-- <h1 class="text-3xl text-white">Loading</h1> -->
  <Spinner />
{/if}
