<script lang="ts">
	import Fa from 'svelte-fa';
	import { faSearch } from '@fortawesome/free-solid-svg-icons';
	import Logo from '$svg/LogoIcon.svg?component';
	import { slide } from 'svelte/transition';

	const css_vars = `--regions-padding: 0.75rem`;

	let summoner: string;

	let suggestionsOpen = false;

	const regions = ['na', 'euw', 'lan'];
	let region: string = regions[0];
	let regionsOpen = false;

	function toggleSuggestions() {
		suggestionsOpen = !suggestionsOpen;
	}
	function toggleRegion() {
		regionsOpen = !regionsOpen;
	}
</script>

<nav id="navbar">
	<Logo class="max-h-[1.75rem] w-full" />
	<button>Home</button>
	<button>About</button>
</nav>

<main class="flex h-screen flex-col items-center justify-center" style={css_vars}>
	<p id="nerf-this">nerf this.</p>
	<form id="summoner-srch" action={`${region}/${summoner}/`} autocomplete="off" tabindex="-1">
		<input id="summoner-inpt" type="text" bind:value={summoner} placeholder="Search for Summoner..." />

		<button
			class="relative w-14 max-w-[3.5rem] text-right uppercase"
			type="button"
			on:focusin={toggleRegion}
			on:focusout={toggleRegion}
		>
			{region}
			{#if regionsOpen}
				<div transition:slide id="regions-dropdown">
					{#each regions as r}
						{#if r == region}
							<label id="region-label-slct" for={r + '-radio'}>{r}</label>
						{:else}
							<label id="region-label" for={r + '-radio'}>{r}</label>
						{/if}
						<input class="hidden" id={r + '-radio'} type="radio" bind:group={region} value={r} />
					{/each}
				</div>
			{/if}
		</button>

		<button id="summoner-sbmt" type="submit">
			<Fa icon={faSearch} />
		</button>
	</form>
</main>

<style>
	#navbar {
		@apply absolute m-5 flex gap-5 rounded-xl p-5 text-xl font-medium shadow-lg backdrop-blur;
		color: var(--text-color);
		background: rgba(var(--bg-comp-r), var(--bg-comp-g), var(--bg-comp-b), var(--tw-bg-opacity));
	}

	#nerf-this {
		@apply select-none p-5 text-7xl font-black;
		color: var(--text-color);
	}

	#summoner-srch {
		@apply flex w-full max-w-lg gap-5 rounded-xl p-5 text-xl font-medium shadow-lg backdrop-blur;
		color: var(--text-color);
		background: rgba(var(--bg-comp-r), var(--bg-comp-g), var(--bg-comp-b), var(--tw-bg-opacity));
	}

	#summoner-inpt {
		@apply w-full bg-transparent placeholder:text-inherit placeholder:text-opacity-80 focus-within:outline-none;
	}

	#regions-dropdown {
		@apply absolute flex flex-col overflow-hidden rounded-xl bg-opacity-100 text-right text-base;
		background: rgba(var(--bg-comp-r), var(--bg-comp-g), var(--bg-comp-b), var(--tw-bg-opacity));
		top: calc(100% + var(--regions-padding) / 2);
		right: calc(0% - var(--regions-padding) / 2);
	}

	#region-label {
		@apply h-full px-3 py-[0.125rem];
	}
	#region-label-slct {
		@apply h-full px-3 py-[0.125rem];
		background: var(--acc-color);
	}

	#summoner-sbmt {
		/* TODO MAYBE */
	}
</style>
