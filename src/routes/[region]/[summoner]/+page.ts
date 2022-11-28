/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	return {
		region: params.region,
		summoner: params.summoner
	};
}
