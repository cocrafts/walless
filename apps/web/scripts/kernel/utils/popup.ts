export const openPopup = async (id: string, requestId: string) => {
	return await chrome.windows.create({
		type: 'popup',
		width: 410,
		height: 600,
		url: `popup.html/#/${id}/${requestId}/popup`,
		focused: true,
	});
};

export const closePopup = (popupId: number) => {
	chrome.windows.remove(popupId);
};
