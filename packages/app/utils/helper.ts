export const shortenAddress = (address: string): string => {
	const firstPart = address.slice(0, 4);
	const lastPart = address.slice(-4);
	return `${firstPart}...${lastPart}`;
};
