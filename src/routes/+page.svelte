<script>
	import Fa from 'svelte-fa';
	import { faSearch } from '@fortawesome/free-solid-svg-icons';
</script>

<main class="flex h-screen items-center justify-center">
	<nav id="summoner-srch">
		<input id="summoner-inpt" type="text" placeholder="Search for Summoner..." />
		<button id="summoner-sbmt" type="submit">
			<Fa icon={faSearch} />
		</button>
	</nav>
</main>

<style>
	#summoner-srch {
		@apply flex w-full max-w-lg gap-5 rounded-xl p-5 text-xl font-medium text-white backdrop-blur;
		background: rgb(165, 146, 106, 0.6);
	}

	#summoner-inpt {
		@apply w-full bg-transparent placeholder:text-inherit placeholder:text-opacity-80 focus-within:outline-none;
	}

	#summoner-sbmt {
		/* TODO MAYBE */
	}
</style>
