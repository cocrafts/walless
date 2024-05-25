export const convertTezosImageUriToUrl = (uri: string) => {
	if (!uri) return '';
	if (!uri.startsWith('ipfs://')) return uri;
	const path = uri.replaceAll('ipfs://', '');

	return `https://ipfs.io/ipfs/${path}`;
};
