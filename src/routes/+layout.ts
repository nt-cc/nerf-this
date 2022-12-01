/** @type {import('./$types').LayoutLoad} */
import { dom_color, comp_color, acc_color, text_color } from '$lib/stores';
import { FastAverageColor } from 'fast-average-color';
import Color from 'color';

const bgURL =
	'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/uncentered/17/17027.jpg';

const fac: FastAverageColor = new FastAverageColor();

// TODO: currently stores Colors in projects stores but this seems inefficient needs more work
// !!! need to find a way to get accent color too, probably a second fetch with algorithm simple
export async function getStyleVars() {
	return await fac
		.getColorAsync(bgURL, { algorithm: 'dominant' })
		.then((result) => {
			const color: Color = new Color(result.rgb);
			let dominant_c, complementary_c, text_c, accent_c;
			let css_vars: string;

			if (result.isDark) {
				dominant_c = color.whiten(0.3);
				complementary_c = color.lightness(50);
				text_c = color.lightness(90);
				accent_c = color.rotate(180);

				css_vars = `--bg-image: url(${bgURL});
							--bg-dom-r: ${dominant_c.red().toString()};
							--bg-dom-g: ${dominant_c.green().toString()};
							--bg-dom-b: ${dominant_c.blue().toString()};
							--bg-comp-r: ${complementary_c.red().toString()};
							--bg-comp-g: ${complementary_c.green().toString()};
							--bg-comp-b: ${complementary_c.blue().toString()};
							--text-color: ${text_c.rgb().string()};
							--acc-color: ${accent_c.rgb().string()};`;
			} else {
				dominant_c = color.darken(0.3);
				complementary_c = color.lightness(50);
				text_c = color.lightness(10);
				accent_c = color.rotate(180);

				css_vars = `--bg-image: url(${bgURL});
							--bg-dom-r: ${dominant_c.red().toString()};
							--bg-dom-g: ${dominant_c.green().toString()};
							--bg-dom-b: ${dominant_c.blue().toString()};
							--bg-comp-r: ${complementary_c.red().toString()};
							--bg-comp-g: ${complementary_c.green().toString()};
							--bg-comp-b: ${complementary_c.blue().toString()};
							--text-color: ${text_c.rgb().string()};
							--acc-color: ${accent_c.rgb().string()};`;
			}
			
			dom_color.set(dominant_c);
			comp_color.set(complementary_c);
			acc_color.set(accent_c);
			text_color.set(text_c);

			return css_vars;
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
