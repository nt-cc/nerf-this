<script lang="ts">
	import '../app.css';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { getStyleVars } from './+layout';

	/** @type {import('./$types').LayoutLoad} */

	let css_vars: any;
	let loaded: boolean = false;

	onMount(async () => {
		css_vars = await getStyleVars();
		loaded = true;
	});
</script>

<div id="wrapper" style={css_vars}>
	{#if loaded}
		<div id="bg-image" in:fade={{ duration: 500, delay: 50 }} />
		<div id="nf-container" in:fade={{ duration: 500, delay: 50 }}>
			<slot />
		</div>
	{:else}
		<div id="nf-container-loading" out:fade={{ duration: 200 }}>
			<slot />
		</div>
	{/if}
</div>

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
	#nf-container-loading {
		@apply absolute top-0 left-0 h-screen w-screen bg-black bg-opacity-30;
	}
</style>
