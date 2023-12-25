import type { ReactNode } from 'react';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import { View } from 'react-native';
import { ResourceSavingView } from '@react-navigation/elements';

type Props = {
	visible: boolean;
	children: ReactNode;
	enabled: boolean;
	freezeOnBlur?: boolean;
	style?: StyleProp<ViewStyle>;
};

/* eslint-disable-next-line */
let Screens: typeof import('react-native-screens') | undefined;

try {
	Screens = require('react-native-screens');
} catch (e) {
	// Ignore
}

export const MaybeScreenContainer = ({
	enabled,
	...rest
}: ViewProps & {
	enabled: boolean;
	hasTwoStates: boolean;
	children: ReactNode;
}) => {
	if (Screens?.screensEnabled?.()) {
		return <Screens.ScreenContainer enabled={enabled} {...rest} />;
	}

	return <View {...rest} />;
};

export function MaybeScreen({ visible, children, ...rest }: Props) {
	if (Screens?.screensEnabled?.()) {
		return (
			<Screens.Screen activityState={visible ? 2 : 0} {...rest}>
				{children}
			</Screens.Screen>
		);
	}

	return (
		<ResourceSavingView visible={visible} {...rest}>
			{children}
		</ResourceSavingView>
	);
}
