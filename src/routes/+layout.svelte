<script lang="ts">
	import './styles.css';

	export let data: any;
</script>

<svelte:head>
	<title>URL shortener</title>
	<meta name="description" content="Just another URL shortener" />
</svelte:head>

<div class="app">
	<main class="h-full bg-black">
		<section class="absolute bg-gradient-to-r from-blue-400 to-indigo-700 h-full w-full grid grid-cols-12 xl:grid-cols-5 items-center grid-flow-col">
			<div class={`${data.error ? 'bg-red-500' : 'bg-neutral-200'} rounded-md w-full h-max xl:col-start-3 md:col-start-4 md:col-span-6 col-start-2 col-span-10 xl:col-span-1 p-4 flex flex-col gap-5`}>
				<slot />
			</div>
		</section>
	</main>
</div>

<style>
	
</style>
