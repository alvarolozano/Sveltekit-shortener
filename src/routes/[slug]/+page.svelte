
<script lang="ts">
export let data: any;
</script>

    <div class={`${data.error ? 'bg-red-500' : 'bg-neutral-200'} rounded-md w-full h-max col-start-3 col-span-1 p-4 flex flex-col gap-5`}>
       {#if data.error}
         {data.data.message}
       {/if}
    </div>
