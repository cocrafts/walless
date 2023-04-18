export const getResponsiveLevel = (screenSize: number): number => {
	if (screenSize > 991) {
		return 0;
	} else if (screenSize > 767) {
		return 1;
	} else if (screenSize > 479) {
		return 2;
	} else {
		return 3;
	}
};

export const detectMobile = (): boolean => {
	const toMatch = [
		/Android/i,
		/webOS/i,
		/iPhone/i,
		/iPad/i,
		/iPod/i,
		/BlackBerry/i,
		/Windows Phone/i,
	];

	return toMatch.some((toMatchItem) => {
		return navigator.userAgent?.match(toMatchItem);
	});
};
