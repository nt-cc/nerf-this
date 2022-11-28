<script lang="ts">
	import '../app.css';
	import { FastAverageColor } from 'fast-average-color';
	import Color from 'color';
	import { onMount } from 'svelte';

	// TODO: we will fethc this randomly from API for now hardcoded
	const bg =
		'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/uncentered/17/17014.jpg';

	// FIXME: this can probably use some refactoring
	onMount(async () => {
		const fac: FastAverageColor = new FastAverageColor();
		const container = document.documentElement;
		fac
			.getColorAsync(bg, { algorithm: 'dominant' })
			.then((result) => {
				var color: Color = new Color(result.rgb);

				if (result.isDark) {
					container.style.setProperty('--bg-dom-color', color.fade(0.2).whiten(0.3).rgb().string());
					container.style.setProperty('--comp', color.fade(0.8).lightness(80).rgb().string());
					container.style.setProperty('--text-color', '#fff');
				} else {
					container.style.setProperty('--bg-dom-color', color.fade(0.2).blacken(0.3).rgb().string());
					container.style.setProperty('--comp', color.fade(0.8).lightness(20).rgb().string());
					container.style.setProperty('--text-color', '#000');
				}
			})
			.catch((e) => {
				console.log(e);
			});
	});
</script>

<div id="bg-image" style="--bg-image: url({bg})" />

<div id="nf-container">
	<slot />
</div>

<style>
	#bg-image {
		@apply h-screen w-screen bg-cover bg-center bg-no-repeat;
		background-image: var(--bg-image);
	}

	#bg-image::after {
		@apply pointer-events-none absolute h-full w-full bg-opacity-80;
		content: '';
		background: var(--bg-dom-color);
		box-shadow: inset 0 0 10rem black;
	}

	#nf-container {
		@apply absolute top-0 left-0 h-screen w-screen bg-black bg-opacity-20;
	}
</style>
