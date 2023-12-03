import HapticFeedback from 'react-native-haptic-feedback';
import type { NativeModules } from '@walless/ioc';

export const nativeModules: NativeModules = {
	triggerHaptic: HapticFeedback.trigger,
};
