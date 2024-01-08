export const removeRedundantCharacters = (text: string) =>
	text.replaceAll('  ', '').replaceAll('\u0000', '').trim();

export const convertDateToReadable = (date: Date) =>
	date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
