import { type ReactNode, forwardRef } from 'react';
import { type ViewStyle, View, ViewProps } from 'react-native';

import { DynamicFlags, iStyles } from '../utils/style';

type Props = DynamicFlags &
	ViewProps & {
		style?: ViewStyle;
		children?: ReactNode;
	};

export const Stack = forwardRef<View, Props>(
	({ style, float, row, children, ...viewProps }, ref) => {
		const containerStyle = [style];

		if (row) containerStyle.push(iStyles.row);
		if (float) containerStyle.push(iStyles.float);

		return (
			<View ref={ref} style={containerStyle} {...viewProps}>
				{children}
			</View>
		);
	},
);

Stack.displayName = 'Stack';

export default Stack;
