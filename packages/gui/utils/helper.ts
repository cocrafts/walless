import { Platform } from 'react-native';
import { runOnJS as originalRunOnJS } from 'react-native-reanimated';

export const runOnJS = Platform.select({
	default: originalRunOnJS as never,
	/* eslint-disable-next-line */
	web: (cb: any) => cb?.(),
});
