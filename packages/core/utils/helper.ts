export const sleep = async (duration = 0) => {
	return new Promise((resolve) => {
		return setTimeout(() => resolve(true), duration);
	});
};
