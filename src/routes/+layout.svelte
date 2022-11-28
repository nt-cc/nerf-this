<script>
	import '../app.css';
</script>

<div id="bg-image" />

<div id="nf-container">
	<slot />
</div>

<style>
	#bg-image {
		@apply h-screen w-screen bg-cover bg-center bg-no-repeat;
		background-image: url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Teemo_47.jpg);
	}

	#bg-image::after {
		@apply pointer-events-none absolute h-full w-full bg-opacity-80;
		content: '';
		/* TODO: get dominat color from random image for this */
		background: rgb(106, 125, 165, 0.8);
		box-shadow: inset 0 0 10rem black;
	}

	#nf-container {
		@apply absolute top-0 left-0 h-screen w-screen bg-black bg-opacity-20;
	}
</style>
