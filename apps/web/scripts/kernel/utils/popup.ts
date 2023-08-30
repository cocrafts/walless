export const openPopup = async (id: string, requestId: string) => {
	const lastFocusedWindow = await chrome.windows.getLastFocused();
	const { top, left = 0, width = 0 } = lastFocusedWindow;
	const leftPos = left + width - 410;

	return await chrome.windows.create({
		top,
		left: leftPos,
		type: 'popup',
		width: 410,
		height: 600,
		url: `popup.html#/${id}/${requestId}/popup`,
		focused: true,
	});
};

export const closePopup = (popupId: number) => {
	chrome.windows.remove(popupId);
};
