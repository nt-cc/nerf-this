<script lang="ts">
	import { NavBar, SummonerSearch } from '$components';
</script>

<!-- FIXME: this file should be / not /home but the custom classes bug is not letting me use / for css styling. Need to wait for a fix -->
<NavBar />

<main class="grid h-screen w-screen grid-cols-1 grid-rows-2 gap-5">
	<p id="nerf-this">nerf this.</p>
	<SummonerSearch />
</main>

<style lang="postcss">
	#nerf-this {
		@apply text-dom-content row-start-1 select-none self-end text-center text-7xl font-black;
	}
</style>
