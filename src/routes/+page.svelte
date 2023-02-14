<script lang="ts">
	import CheckIcon from 'svelte-icons/fa/FaCheck.svelte';
	import CopyIcon from 'svelte-icons/fa/FaCopy.svelte';
	import ShareIcon from 'svelte-icons/fa/FaShareAlt.svelte';
	import CalendarIcon from 'svelte-icons/fa/FaCalendar.svelte';
	import CrossIcon from 'svelte-icons/fa/FaTimes.svelte';

	import { fly } from "svelte/transition";

	export let form: {url: String} | undefined;
	let visited=false;
	let valid=false;
	export let data: any;

	let btn: HTMLElement;
	let grid: HTMLElement;
	let date: HTMLElement;

	let dateEnabled: boolean = false;


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
		if(valid) {
			btn.classList.remove('translate-x-full');
			grid.classList?.remove('w-0');
			grid.classList?.add('w-full');

		}
	}

	function troll(e: any) {
		if(!valid && btn && grid) {
			grid.classList.contains('w-full') ? 
				grid.classList.replace('w-full', 'w-0') :
				grid.classList.replace('w-0', 'w-full');
			
		
			btn.classList?.toggle('translate-x-full');
		}
	}

</script>


	<form method="post" class={`bg-neutral-200 rounded-md w-full h-max col-start-3 col-span-1 p-4 flex flex-col gap-5 transition-all dark:bg-neutral-800`}>
		{#if !form || !form.url}
			<h1 class="text-2xl text-center dark:text-white">Short an URL</h1>
			<input type="url" required name="url" class="w-full ring-0 bg-neutral-400 dark:bg-neutral-700  rounded-md h-11 px-2 text-black dark:text-neutral-50 placeholder:text-gray-700 dark:placeholder:text-neutral-400" placeholder="enter an URL" on:keydown={validate} on:input={validate}/>
			<button type="button" class="text-red-500 w-max flex gap-2 items-center" on:click={() => dateEnabled = !dateEnabled}>
				<div class="h-4 w-4">
					{#if !dateEnabled}
						<CalendarIcon />
					{/if}
					{#if dateEnabled}
						<CrossIcon />
					{/if}
				</div>
				{
					dateEnabled ?
					'Remove expiration' :
					'Set expiration'
				}
				
			</button>
			{#if dateEnabled}
				<input in:fly={{ y: -30 }} out:fly={{ y: -30 }} name="expiration" placeholder="Expiration" bind:this={date} type="datetime-local" class="w-max p-2 bg-neutral-400 dark:bg-neutral-700 dark:text-neutral-50 placeholder:text-gray-700 dark:placeholder:text-neutral-400 rounded-md" min={new Date().toDateString()} />
			{/if}
			
			
			<div bind:this={grid} class="flex w-full flex-row transition-all justify-end duration-1000">
				<button bind:this={btn} type={valid ? 'submit' : 'button'} class:bg-red-600={!valid} class:dark:bg-sky-700={valid} class:bg-black={valid} formaction="/" class={`w-max px-12 text-white py-2 rounded-full transition-all duration-1000`} on:mouseenter={troll}>Send</button>
			</div>
		{/if}
			
		{#if form && form.url}
			<div class="flex lg:flex-row flex-col items-center gap-2">
				<p class="w-full h-full lg:text-start text-center break-words dark:text-white" id="result">{form.url}</p>
				<div class="flex gap-2">

				
					<button class={`${visited ? 'text-black border-sky-900 dark:border-transparent dark:bg-green-600 dark:border-green-900 dark:text-white' : 'bg-neutral-800 dark:bg-sky-800 text-white dark:text-neutral-200 border-transparent'} border-2 h-full p-2 rounded-full transition-all duration-1000`} type="button" on:click={copy}>
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


