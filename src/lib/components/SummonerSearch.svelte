<script lang="ts">
	import Fa from 'svelte-fa';
	import { faClock, faL, faSearch } from '@fortawesome/free-solid-svg-icons';
	import { slide } from 'svelte/transition';

	const css_vars = `--regions-padding: 0.75rem`;

	let summoner: string;
	let recentsOpen = false;

	const regions = ['na', 'euw', 'lan'];
	let region: string = regions[0];
	let regionsOpen = false;

	function toggleRecents() {
		if (document.getElementById('summoner-form')?.contains(document.activeElement)) {
			// INFO if form is focused
			if (document.getElementById('regions-btn') === document.activeElement) {
				// <> and if the focus is on the regions button dont open
				recentsOpen = false;
			} else {
				// <> otherwise open
				recentsOpen = true;
			}
		} else {
			// <> focus is outside form so dont open
			recentsOpen = false;
		}
	}

	function toggleRegion() {
		regionsOpen = !regionsOpen;
	}
</script>

<!-- TODO: this still needs some work to make things simpler -->
<form
	id="summoner-form"
	class="row-start-2 flex h-full w-full max-w-lg flex-col items-center gap-5 self-start justify-self-center"
	action={`${region}/${summoner}/`}
	autocomplete="off"
	style={css_vars}
	on:focusin={toggleRecents}
	on:focusout={toggleRecents}>
	<div id="summoner-srch-wrap" class="bg-comp card z-10 h-min w-full min-w-max max-w-lg shadow-lg">
		<input
			id="summoner-inpt"
			class="w-full bg-transparent placeholder:text-inherit placeholder:text-opacity-80 focus-within:outline-none"
			type="text"
			placeholder="Search for Summoner..."
			bind:value={summoner} />
		<button
			id="regions-btn"
			class="focus-within:outline-none; relative w-14 max-w-[3.5rem] text-right uppercase"
			type="button"
			on:focusin={toggleRegion}
			on:focusout={toggleRegion}>
			{region}
			{#if regionsOpen}
				<div
					id="regions-dropdown"
					class="bg-comp absolute flex flex-col overflow-hidden rounded-xl bg-opacity-100 text-right text-base shadow-lg"
					transition:slide={{ duration: 200 }}>
					{#each regions as r}
						{#if r == region}
							<label id="region-btn-sltc" class="h-full px-3 py-[0.125rem]" for={r + '-radio'}>
								{r}
							</label>
						{:else}
							<label id="region-btn" class="bg-acc h-full px-3 py-[0.125rem]" for={r + '-radio'}>
								{r}
							</label>
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

	{#if recentsOpen}
		<div
			id="recent-smmnrs"
			class="card bg-comp h-min w-full max-w-lg shadow"
			transition:slide={{ duration: 200 }}
			tabindex="-1">
			<span class="flex items-center justify-start gap-2 text-sm uppercase leading-none">
				recents <Fa icon={faClock} />
			</span>
			<div id="summoner-sugg-wrapper" class="flex gap-3 overflow-auto">
				{#each ['kwahson', 'CrystalSmth', 'Capt Tenmo', 'Kohzo', 'emmi'] as user}
					<button
						id={user}
						class="button bg-comp opacity-100"
						on:click={() => {
							//TODO: add region next to summoner
							summoner = user;
						}}>
						{user}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</form>

<style lang="postcss">
	#regions-dropdown {
		top: calc(100% + var(--regions-padding) / 2);
		right: calc(0% - var(--regions-padding) / 2);
	}

	#summoner-sugg-wrapper::-webkit-scrollbar {
		display: none;
	}
</style>
