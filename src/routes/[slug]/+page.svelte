
<script lang="ts">
export let data: any;
</script>

<svelte:head>
  {#if !data.error && data.meta}
    <title>{data.meta.title}</title>
    <meta name="description" content={data.meta.description} />
    {#each data.meta.images as image}
      <meta name="og:image" content={image.url} />
    {/each}
  {/if}
</svelte:head>

{#if data.error}
  {data.data.message}
{/if}
