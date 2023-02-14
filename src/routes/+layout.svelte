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
		<section class="absolute bg-gradient-to-r from-blue-400 to-indigo-700 dark:from-zinc-900 dark:to-slate-900 h-full w-full grid grid-cols-12 items-center grid-flow-col">
			<div class={`${data.error ? 'bg-red-500' : 'bg-neutral-200'} rounded-md w-full h-max md:col-start-4 md:col-span-6 col-start-2 col-span-10 p-4 flex flex-col gap-5 dark:bg-neutral-800`}>
				<slot />
			</div>
		</section>
	</main>
</div>

<style>
	
</style>
