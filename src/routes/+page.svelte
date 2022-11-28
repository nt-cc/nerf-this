<script>
	import Fa from 'svelte-fa';
	import { faSearch } from '@fortawesome/free-solid-svg-icons';
</script>

<main class="flex h-screen flex-col items-center justify-center">
	<p id="nerf-this">nerf this.</p>
	<nav id="summoner-srch">
		<input id="summoner-inpt" type="text" placeholder="Search for Summoner..." />
		<button id="summoner-sbmt" type="submit">
			<Fa icon={faSearch} />
		</button>
	</nav>
</main>

<style>
	#nerf-this {
		@apply p-5 text-7xl font-black;
		color: var(--text-color);
	}

	#summoner-srch {
		@apply flex w-full max-w-lg gap-5 rounded-xl p-5 text-xl font-medium backdrop-blur;
		color: var(--text-color);
		background: var(--comp);
	}

	#summoner-inpt {
		@apply w-full bg-transparent placeholder:text-inherit placeholder:text-opacity-80 focus-within:outline-none;
	}

	#summoner-sbmt {
		/* TODO MAYBE */
	}
</style>
