import { type MiniBroadcast } from '@walless/core';

export const requestSourceMap: Record<string, MiniBroadcast> = {};
export const popupIdentityMap: Record<string, chrome.windows.Window> = {};

export const handleOpenPopup = async (requestId: string) => {
	const popupIdentity = await chrome.windows.create({
		type: 'popup',
		width: 410,
		height: 600,
		url: `popup.html/#/request-connection/${requestId}`,
		focused: true,
	});

	popupIdentityMap[requestId] = popupIdentity;
};

export const handleClosePopup = (requestId: string) => {
	chrome.windows.remove(popupIdentityMap[requestId]?.id as number, () => {
		delete popupIdentityMap[requestId];
	});
};
