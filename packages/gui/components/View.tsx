import { type ReactNode, forwardRef } from 'react';
import { type ViewStyle, View as RNView, ViewProps } from 'react-native';

import { DynamicFlags, iStyles } from '../utils/style';

type Props = DynamicFlags &
	ViewProps & {
		style?: ViewStyle;
		children?: ReactNode;
	};

export const View = forwardRef<RNView, Props>(
	({ style, float, row, children, ...viewProps }, ref) => {
		const containerStyle = [style];

		if (row) containerStyle.push(iStyles.row);
		if (float) containerStyle.push(iStyles.float);

		return (
			<RNView ref={ref} style={containerStyle} {...viewProps}>
				{children}
			</RNView>
		);
	},
);

View.displayName = 'Stack';

export default View;
