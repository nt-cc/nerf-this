/** @type {import('./$types').LayoutLoad} */

const bgURL =
	'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/uncentered/17/17027.jpg';

import { FastAverageColor } from 'fast-average-color';
import Color from 'color';

const fac: FastAverageColor = new FastAverageColor();

// TODO: should probably add a function to return the dominant color as an OBJ and rework this function to use it
// ~ a color obj will be usefull to keep manipulating the colo without fetching again e.g. get new colors for the summoner suggestions
// ! need to find a way to get accent color too, probably a second fetch with algorithm simple
export async function getStyleVars() {
	return await fac
		.getColorAsync(bgURL, { algorithm: 'dominant' })
		.then((result) => {
			const color: Color = new Color(result.rgb);

			if (result.isDark) {
				const dom_color = color.whiten(0.3);
				const comp_color = color.lightness(50);
				const text_color = color.lightness(90).rgb().string();
				const acc_color = color.rotate(180).rgb().string();

				return `--bg-image: url(${bgURL});
						--bg-dom-r: ${dom_color.red().toString()};
						--bg-dom-g: ${dom_color.green().toString()};
						--bg-dom-b: ${dom_color.blue().toString()};
						--bg-comp-r: ${comp_color.red().toString()};
						--bg-comp-g: ${comp_color.green().toString()};
						--bg-comp-b: ${comp_color.blue().toString()};
						--text-color: ${text_color};
						--acc-color: ${acc_color};`;
			} else {
				const dom_color = color.darken(0.3);
				const comp_color = color.lightness(50);
				const text_color = color.lightness(10).rgb().string();
				const acc_color = color.rotate(180).rgb().string();

				return `--bg-image: url(${bgURL});
						--bg-dom-r: ${dom_color.red().toString()};
						--bg-dom-g: ${dom_color.green().toString()};
						--bg-dom-b: ${dom_color.blue().toString()};
						--bg-comp-r: ${comp_color.red().toString()};
						--bg-comp-g: ${comp_color.green().toString()};
						--bg-comp-b: ${comp_color.blue().toString()};
						--text-color: ${text_color};
						--acc-color: ${acc_color};`;
			}
		})
		.catch((e) => {
			console.log(e);
		});
}

export function load() {
	return {
		test: 'test'
	};
}
