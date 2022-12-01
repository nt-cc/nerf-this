import type Color from "color";
import { writable, type Writable } from "svelte/store";

export const dom_color: Writable<Color> = writable()
export const comp_color: Writable<Color> = writable()
export const acc_color: Writable<Color> = writable()
export const text_color: Writable<Color> = writable()