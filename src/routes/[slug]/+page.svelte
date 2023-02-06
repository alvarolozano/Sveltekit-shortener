
<script lang="ts">
export let data: any;
</script>

{#if data.error}
  {data.data.message}
{/if}
