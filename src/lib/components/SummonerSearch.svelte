<script lang="ts">
	import Fa from 'svelte-fa';
	import { faClock, faL, faSearch } from '@fortawesome/free-solid-svg-icons';
	import { slide } from 'svelte/transition';

	const css_vars = `--regions-padding: 0.75rem`;

	let summoner: string;
	let searchFocused = false;

	const regions = ['na', 'euw', 'lan'];
	let region: string = regions[0];
	let regionsOpen = false;

	function openRecents() {
		searchFocused = true;
	}

	function closeRecents() {
		if (document.getElementById('summoner-recent') !== document.activeElement) {
			searchFocused = false;
		}
	}
	function toggleRegion() {
		regionsOpen = !regionsOpen;
	}
</script>

<!-- TODO: this still needs some work to make things simpler -->

<form
	id="summoner-form"
	action={`${region}/${summoner}/`}
	autocomplete="off"
	style={css_vars}
	on:focusin={openRecents}
	on:focusout={closeRecents}
>
	<div id="summoner-srch-wrap">
		<input id="summoner-inpt" type="text" placeholder="Search for Summoner..." bind:value={summoner} />

		<button id="regions-btn" type="button" on:focusin={toggleRegion} on:focusout={toggleRegion}>
			{region}
			{#if regionsOpen}
				<div id="regions-dropdown" transition:slide={{ duration: 200 }}>
					{#each regions as r}
						{#if r == region}
							<label class="region-label-slct" for={r + '-radio'}> {r} </label>
						{:else}
							<label class="region-label" for={r + '-radio'}> {r} </label>
						{/if}
						<input id={r + '-radio'} class="hidden" type="radio" bind:group={region} value={r} />
					{/each}
				</div>
			{/if}
		</button>

		<button id="summoner-sbmt" type="submit">
			<Fa icon={faSearch} />
		</button>
	</div>

	{#if searchFocused}
		<div id="summoner-recent" transition:slide={{ duration: 200 }} tabindex="-1">
			<span class="flex items-center justify-start gap-2 text-sm uppercase leading-none">
				recents <Fa icon={faClock} />
			</span>
			<div id="summoner-sugg-wrapper">
				{#each ['kwahson', 'CrystalSmth', 'Capt Tenmo', 'Kohzo', 'emmi'] as user}
					<button
						class="summoner-sugg"
						on:click={() => {
							//TODO: add region next to summoner
							closeRecents();
							summoner = user;
						}}
					>
						{user}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</form>

<style lang="postcss">
	#summoner-form {
		@apply row-start-2 flex h-full w-full max-w-lg flex-col items-center gap-5 self-start justify-self-center;
	}

	#summoner-srch-wrap {
		@apply bg-dom card z-10 h-min w-full min-w-max max-w-lg shadow-lg;
	}

	#summoner-inpt {
		@apply w-full bg-transparent placeholder:text-inherit placeholder:text-opacity-80 focus-within:outline-none;
	}

	#regions-btn {
		@apply relative w-14 max-w-[3.5rem] text-right uppercase focus-within:outline-none;
	}

	#regions-dropdown {
		@apply bg-dom absolute flex flex-col overflow-hidden rounded-xl bg-opacity-100 text-right text-base shadow-lg;
		top: calc(100% + var(--regions-padding) / 2);
		right: calc(0% - var(--regions-padding) / 2);
	}

	.region-label {
		@apply h-full px-3 py-[0.125rem];
	}

	.region-label-slct {
		@apply bg-acc h-full px-3 py-[0.125rem];
	}

	#summoner-recent {
		@apply card bg-dom h-min w-full max-w-lg shadow;
	}

	#summoner-sugg-wrapper {
		@apply flex gap-3 overflow-auto;
	}

	#summoner-sugg-wrapper::-webkit-scrollbar {
		display: none;
	}

	.summoner-sugg {
		@apply button bg-dom opacity-100;
	}

	#summoner-sbmt {
		/* TODO MAYBE */
	}
</style>
