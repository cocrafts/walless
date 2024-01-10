import type { NativeModules } from './types';

export * from './types';

export const triggerHaptic = () => {};
export const hydrateEncryptionKey = () => {};
export const retrieveEncryptionKey = async () => null;

export const nativeModules: NativeModules = {
	triggerHaptic,
	hydrateEncryptionKey,
	retrieveEncryptionKey,
};
