<script lang="ts">
	import '../app.css';
	import { FastAverageColor } from 'fast-average-color';
	import Color from 'color';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	// /** @type {import('./$types').LayoutLoad} */
	// export let data;
	// console.log(data);

	let loaded = false;

	// TODO: we will fetch this randomly from API; for now hardcoded
	const bg =
		'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/uncentered/17/17027.jpg';
	// const bg =
	// 	'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/uncentered/99/99040.jpg';

	// FIXME: this can probably use some refactoring
	onMount(async () => {
		const fac: FastAverageColor = new FastAverageColor();
		const container = document.documentElement;
		fac
			.getColorAsync(bg, { algorithm: 'dominant' })
			.then((result) => {
				var color: Color = new Color(result.rgb);

				if (result.isDark) {
					const dom_color: Color = color.whiten(0.3);
					const comp_color: Color = color.lightness(50);

					// dominant color
					container.style.setProperty('--bg-dom-r', dom_color.red().toString());
					container.style.setProperty('--bg-dom-g', dom_color.green().toString());
					container.style.setProperty('--bg-dom-b', dom_color.blue().toString());
					// complementary colo
					container.style.setProperty('--bg-comp-r', comp_color.red().toString());
					container.style.setProperty('--bg-comp-g', comp_color.green().toString());
					container.style.setProperty('--bg-comp-b', comp_color.blue().toString());
					// text
					container.style.setProperty('--text-color', color.lightness(90).rgb().string());
				} else {
					const dom_color: Color = color.fade(0.2).blacken(0.3);
					const comp_color: Color = color.fade(0.7).lightness(50);

					// dominant color
					container.style.setProperty('--bg-dom-r', dom_color.red().toString());
					container.style.setProperty('--bg-dom-g', dom_color.green().toString());
					container.style.setProperty('--bg-dom-b', dom_color.blue().toString());
					// complementary colo
					container.style.setProperty('--bg-comp-r', comp_color.red().toString());
					container.style.setProperty('--bg-comp-g', comp_color.green().toString());
					container.style.setProperty('--bg-comp-b', comp_color.blue().toString());
					// text
					container.style.setProperty('--text-color', color.lightness(10).rgb().string());
				}
				loaded = true;
			})
			.catch((e) => {
				console.log(e);
			});
	});
</script>

{#if loaded}
	<div id="bg-image" transition:fade={{ duration: 500 }} style="--bg-image: url({bg})" />
	<div id="nf-container" transition:fade={{ duration: 500 }}>
		<slot />
	</div>
{:else}
	<div id="nf-container" transition:fade={{ duration: 500 }}>
		<slot />
	</div>
{/if}

<style>
	#bg-image {
		@apply h-screen w-screen bg-cover bg-center bg-no-repeat;
		background-image: var(--bg-image);
	}

	#bg-image::after {
		@apply pointer-events-none absolute h-full w-full bg-opacity-70;
		content: '';
		background: rgba(var(--bg-dom-r), var(--bg-dom-g), var(--bg-dom-b), var(--tw-bg-opacity));
		box-shadow: inset 0 0 10rem black;
	}

	#nf-container {
		@apply absolute top-0 left-0 h-screen w-screen bg-black bg-opacity-30;
	}
</style>
