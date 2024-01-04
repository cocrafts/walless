import type { NativeModules } from '@walless/ioc';

export const triggerHaptic = () => {};
export const hydrateEncryptionKey = () => {};
export const retrieveEncryptionKey = async () => null;

export const nativeModules: NativeModules = {
	triggerHaptic,
	hydrateEncryptionKey,
	retrieveEncryptionKey,
};
