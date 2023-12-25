import { useContext } from 'react';
import type { SharedValue } from 'react-native-reanimated';

import DrawerProgressContext from './DrawerProgressContext';

export default function useDrawerProgress(): Readonly<SharedValue<number>> {
	const progress = useContext(DrawerProgressContext);

	if (progress === undefined) {
		throw new Error(
			"Couldn't find a drawer. Is your component inside a drawer navigator?",
		);
	}

	return progress;
}
