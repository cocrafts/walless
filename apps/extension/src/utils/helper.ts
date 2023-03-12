export const delay = async (timeout: number): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), timeout);
	});
};
