import { type MiniBroadcast } from '@walless/core';
import { type MessagePayload, type PopupType } from '@walless/messaging';

interface RequestContent {
	channel: MiniBroadcast;
	popup?: chrome.windows.Window;
	payload: MessagePayload;
	resolve: boolean;
}

export const requestMap: Record<string, RequestContent> = {};

export const handleOpenPopup = async (
	popupType: PopupType,
	requestId: string,
) => {
	return await chrome.windows.create({
		type: 'popup',
		width: 410,
		height: 600,
		url: `popup.html/#/${popupType}/${requestId}`,
		focused: true,
	});
};

export const handleClosePopup = (requestId: string) => {
	chrome.windows.remove(requestMap[requestId].popup?.id as number, () => {
		delete requestMap[requestId];
	});
};
