<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data: {
		region: string;
		summoner: string;
	};
</script>

<main class="text-dom-content flex h-screen w-screen flex-col items-center justify-center text-4xl">
	<h1>{data.summoner}</h1>
	<h2>{data.region}</h2>
</main>
