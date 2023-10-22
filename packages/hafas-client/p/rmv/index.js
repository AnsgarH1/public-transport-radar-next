// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions

import baseProfile from "./base.json";
import { products } from "./products.js";

const profile = {
	...baseProfile,
	locale: "de-DE",
	timezone: "Europe/Berlin",

	products,

	refreshJourneyUseOutReconL: true,
	trip: true,
	radar: true,
	refreshJourney: true,
	reachableFrom: true,
};

export { profile };
