export const openPopup = async (id: string, resolveId: string) => {
	const lastFocusedWindow = await chrome.windows.getLastFocused();
	const { top, left = 0, width = 0 } = lastFocusedWindow;
	const leftPos = left + width - 420;

	return await chrome.windows.create({
		top,
		left: leftPos,
		type: 'popup',
		width: 420,
		height: 600,
		url: `popup.html#/requests/${id}/${resolveId}`,
		focused: true,
	});
};

export const closePopup = (popupId: number) => {
	chrome.windows.remove(popupId);
};
