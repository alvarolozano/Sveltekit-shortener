<script lang="ts">
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	export let form: {url: String} | undefined;
	let visited=false;


	function copy() {
		navigator.clipboard.writeText(`${form?.url}`).then(() => {
			visited = true;
		});
	}
</script>

	<form method="post" class={`${form?.url ? 'bg-green-400' : 'bg-neutral-200'} rounded-md w-full h-max col-start-3 col-span-1 p-4 flex flex-col gap-5`}>
		{#if !form || !form.url}
			<h1 class="text-2xl text-center">Short an URL</h1>
			<input type="url" name="url" class="w-full ring-0 bg-neutral-400 rounded-md h-11 px-2 text-black placeholder:text-gray-700" placeholder="enter an URL"/>
			<button formaction="/" class="w-full bg-black text-white py-2 rounded-full">Send</button>
		{/if}
			
		{#if form && form.url}
			<div class="flex items-center">
				<p class="w-full h-full">{form.url}</p>
				<button class={`${visited ? 'bg-white text-black' : 'bg-black text-white'} h-full p-2 rounded-md transition-all duration-1000`} type="button" on:click={copy}>Copy</button>
			</div>
		{/if}
	</form>


