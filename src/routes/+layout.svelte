<script lang="ts">
	import '/src/app.postcss';
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
		<div
			id="bg-image"
			class=" after:bg-dom h-screen w-screen bg-cover bg-center bg-no-repeat after:pointer-events-none after:absolute after:h-full after:w-full after:bg-opacity-70"
			in:fade={{ duration: 500, delay: 50 }} />
		<div
			id="nf-container"
			class="absolute top-0 left-0 h-screen w-screen bg-black bg-opacity-30"
			in:fade={{ duration: 500, delay: 50 }}>
			<slot />
		</div>
	{:else}
		<div
			id="nf-container-loading"
			class="absolute top-0 left-0 h-screen w-screen bg-black bg-opacity-30"
			out:fade={{ duration: 200 }}>
			<slot />
		</div>
	{/if}
</div>

<style>
	#bg-image {
		background-image: var(--bg-image);
	}

	#bg-image::after {
		content: '';
		box-shadow: inset 0 0 16rem black;
	}
</style>
