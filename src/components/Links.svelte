<script lang="ts">
  import { prisma } from "../utils/prisma";
  import type { Session } from "@auth/core/types";
  import type { Link } from "../utils/types";
  import Card from "./Card.svelte";

  export let url: string;
  let data: Link[] | null = null;

  const fetchData = async () => {
    const res = await fetch(`${url}/api/slugs`);
    const json = await res.json();
    console.log(json);
    data = json;
  };

  fetchData();
</script>

{#if data}
  {#each data as short}
    <Card data={short} />
  {/each}
{:else}
  <p>Loading...</p>
{/if}
