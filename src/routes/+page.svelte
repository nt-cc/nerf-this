<script lang="ts">
	import { NavBar, SummonerSearch } from '$components';
</script>

<NavBar />

<main class="grid h-screen w-screen grid-cols-1 grid-rows-2 gap-5">
	<p id="nerf-this" class="text-dom-content row-start-1 select-none self-end text-center text-7xl font-black">
		nerf this.
	</p>
	<SummonerSearch />
</main>
