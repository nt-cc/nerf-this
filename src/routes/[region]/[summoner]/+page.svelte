<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data: {
		region: string;
		summoner: string;
	};
</script>

<h1 id="region">{data.region}</h1>
<h1>{data.summoner}</h1>

<style>
	#region {
		@apply text-2xl;
	}
</style>
