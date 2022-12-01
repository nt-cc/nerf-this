<script lang="ts">
	import Logo from '$svg/LogoIcon.svg?component';
</script>

<nav id="navbar">
	<Logo class="max-h-[1.75rem] w-full" />
	<button href="#">Home</button>
	<button>About</button>
</nav>

<style lang="postcss">
	#navbar {
		@apply card bg-dom absolute m-5 shadow-lg;
	}
</style>
