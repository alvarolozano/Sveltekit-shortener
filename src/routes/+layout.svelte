<script>
	import './styles.css';
</script>

<svelte:head>
	<title>URL shortener</title>
	<meta name="description" content="Just another URL shortener" />
</svelte:head>

<div class="app">
	<main class="h-full bg-black">
		<section class="absolute bg-gradient-to-r from-blue-400 to-indigo-700 h-full w-full grid grid-cols-5 items-center grid-flow-col">
			<slot />
		</section>
	</main>
</div>

<style>
	
</style>
