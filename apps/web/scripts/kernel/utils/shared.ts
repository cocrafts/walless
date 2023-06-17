import { type MiniBroadcast } from '@walless/core';
import { type MessagePayload, type PopupType } from '@walless/messaging';

interface RequestContent {
	channel: MiniBroadcast;
	popup?: chrome.windows.Window;
	payload: MessagePayload;
	resolve: boolean;
}

export const requestMap: Record<string, RequestContent> = {};

export const openPopup = async (popupType: PopupType, requestId: string) => {
	return await chrome.windows.create({
		type: 'popup',
		width: 410,
		height: 600,
		url: `popup.html/#/${popupType}/${requestId}`,
		focused: true,
	});
};

export const closePopup = (popupId: number) => {
	chrome.windows.remove(popupId);
};
