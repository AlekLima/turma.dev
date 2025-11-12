import { ColorKey, colorMap } from "./types";

/**
 * Maps month numbers to English month names using a numeric enum.
 * The enum values start at 1 so we can use reverse-mapping: NumberToMonth[1] === 'January'
 */
export enum NumberToMonth {
	January = 1,
	February,
	March,
	April,
	May,
	June,
	July,
	August,
	September,
	October,
	November,
	December,
}

/**
 * Convert a number (1-12) to the English month name.
 * Returns the month name (e.g. 1 -> "January") or null if the input is out of range.
 */
export function numberToMonthEN(monthNumber: number): string | null {
	if (!Number.isInteger(monthNumber) || monthNumber < 1 || monthNumber > 12) return null;
	// Numeric enums in TS have reverse mapping: NumberToMonth[1] === 'January'
	return NumberToMonth[monthNumber] ?? null;
}

/**
 * Convert a number (1-12) to the Portuguese (pt-BR) month name.
 * Returns the month name (e.g. 1 -> "Janeiro") or null if the input is out of range.
 */
export function numberToMonthPTBR(monthNumber: number): string | null {
	if (!Number.isInteger(monthNumber) || monthNumber < 1 || monthNumber > 12) return null;

	const monthsPTBR = [
		"Janeiro",
		"Fevereiro",
		"Março",
		"Abril",
		"Maio",
		"Junho",
		"Julho",
		"Agosto",
		"Setembro",
		"Outubro",
		"Novembro",
		"Dezembro",
	];

	return monthsPTBR[monthNumber - 1];
}

let lastColor: ColorKey | null = null;


/**
 * Return a pseudo-random `ColorKey` selected from `colorMap`.
 *
 * Behavior / guarantees:
 * - Chooses uniformly at random from the keys of `colorMap`.
 * - Avoids returning the same color twice in a row by tracking `lastColor`.
 *   If the map contains only a single key, the function will return that key
 *   (the `do/while` loop will exit immediately because the value cannot
 *   differ from `lastColor`).
 * - Updates `lastColor` with the newly chosen color so subsequent calls
 *   will avoid repeating it.
 *
 * Note: randomness is provided by `Math.random()` and is therefore not
 * cryptographically secure — this is suitable for UI color variety but
 * not for security-sensitive use.
 */
export function getRandomColor(): ColorKey {
	const keys = Object.keys(colorMap) as ColorKey[];
	let color: ColorKey;

	do {
		color = keys[Math.floor(Math.random() * keys.length)];
	} while (color === lastColor);

	lastColor = color;
	return color;
}

