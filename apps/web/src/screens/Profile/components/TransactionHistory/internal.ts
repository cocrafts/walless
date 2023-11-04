export const handleRemoveRedundantCharacters = (text: string) =>
	text.replaceAll('  ', '').replaceAll('\u0000', '').trim();

export const handleConvertDateToReadable = (date: Date) =>
	date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
