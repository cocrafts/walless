export const logoSize = 60;
export const logoUri = { uri: '/img/app_logo.png' };

export interface PayloadOptions {
	sourceRequestId: string;
	isApproved: boolean;
	passcode: string;
}
