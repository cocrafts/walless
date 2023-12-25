import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { View } from 'react-native';
import type {
	PanGestureHandlerProperties,
	TapGestureHandlerProperties,
} from 'react-native-gesture-handler';

/* eslint-disable-next-line */
const Dummy: any = ({ children }: { children: ReactNode }) => (
	<Fragment>{children}</Fragment>
);

export const PanGestureHandler =
	Dummy as React.ComponentType<PanGestureHandlerProperties>;

export const TapGestureHandler =
	Dummy as React.ComponentType<TapGestureHandlerProperties>;

export const GestureHandlerRootView = View;

export const GestureState = {
	UNDETERMINED: 0,
	FAILED: 1,
	BEGAN: 2,
	CANCELLED: 3,
	ACTIVE: 4,
	END: 5,
};

export type { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
