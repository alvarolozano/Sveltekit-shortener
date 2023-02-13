<script lang="ts">
	import CheckIcon from 'svelte-icons/fa/FaCheck.svelte';
	import CopyIcon from 'svelte-icons/fa/FaCopy.svelte';
	import ShareIcon from 'svelte-icons/fa/FaShareAlt.svelte';

	export let form: {url: String} | undefined;
	let visited=false;
	let valid=false;
	export let data: any;


	function copy() {
		navigator.clipboard.writeText(`${form?.url}`).then(() => {
			visited = true;
		})
		.finally(() => {
			setTimeout(() => {
				visited = false;
			}, 3000);
		});

		(window.getSelection() as any).selectAllChildren(document.getElementById('result') as any);
	}

	function share() {
		if(form?.url)
			window.navigator.share({
				url: `${form.url}`
			});
	}

	function validate(e: any) {
		valid = e.target.validity.valid;
	}

	function troll() {
		const classes = document.getElementById('troll-grid')?.classList;
		if(!valid && classes) {
			classes.contains('w-max') ? 
					classes.replace('w-max', 'w-full') :
					classes.replace('w-full', 'w-max');
		}
	}

</script>


	<form method="post" class={`bg-neutral-200 rounded-md w-full h-max col-start-3 col-span-1 p-4 flex flex-col gap-5 transition-all`}>
		{#if !form || !form.url}
			<h1 class="text-2xl text-center">Short an URL</h1>
			<input type="url" required name="url" class="w-full ring-0 bg-neutral-400 rounded-md h-11 px-2 text-black placeholder:text-gray-700" placeholder="enter an URL" on:keydown={validate} on:input={validate}/>
			<div id="troll-grid" class="flex transition-all w-full justify-end">
				<button formaction="/" class={`${valid ? 'bg-black' : 'bg-red-600'} w-max px-12 text-white py-2 rounded-full transition-all`} on:mousemove={troll}>Send</button>
			</div>
		{/if}
			
		{#if form && form.url}
			<div class="flex lg:flex-row flex-col items-center gap-2">
				<p class="w-full h-full lg:text-start text-center break-words" id="result">{form.url}</p>
				<div class="flex gap-2">

				
					<button class={`${visited ? 'text-black border-sky-900' : 'bg-neutral-800 text-white border-transparent'} border-2 h-full p-2 rounded-full transition-all duration-1000`} type="button" on:click={copy}>
						<div class="h-6 w-6 p-0.5">
							{#if !visited}
								<CopyIcon />
							{/if}
							{#if visited}
								<CheckIcon />
							{/if}
						</div>
					</button>

					{#if data.shareAPI}
						<button class={`bg-neutral-700 text-white h-full border-2 border-transparent p-2 rounded-full transition-all duration-1000`} type="button" on:click={share}>
							<div class="h-6 w-6">
								<ShareIcon />
							</div>
						</button>
					{/if}
				</div>
			</div>
		{/if}
	</form>


