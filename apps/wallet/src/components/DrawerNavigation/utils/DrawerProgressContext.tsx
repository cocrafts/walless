import { createContext } from 'react';
import type { SharedValue } from 'react-native-reanimated';

export default createContext<Readonly<SharedValue<number>> | undefined>(
	undefined,
);
