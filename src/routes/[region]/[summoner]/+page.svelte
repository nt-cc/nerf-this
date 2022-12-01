<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data: {
		region: string;
		summoner: string;
	};
</script>

<main>
	<h1>{data.summoner}</h1>
	<h2>{data.region}</h2>
</main>

<style>
	main {
		@apply card flex h-screen w-screen flex-col items-center justify-center text-4xl;
		color: var(--text-color);
	}
</style>
