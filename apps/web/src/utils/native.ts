import type { NativeModules } from '@walless/ioc';

export const nativeModules: NativeModules = {
	triggerHaptic: () => {},
	hydrateEncryptionKey: () => {},
	retrieveEncryptionKey: async () => null,
};
