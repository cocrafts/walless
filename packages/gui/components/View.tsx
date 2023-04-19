import { type ReactNode, forwardRef } from 'react';
import { type ViewStyle, View as RNView, ViewProps } from 'react-native';

import { DynamicFlags, iStyles } from '../utils/style';

type Props = DynamicFlags &
	ViewProps & {
		style?: ViewStyle;
		children?: ReactNode;
	};

export const View = forwardRef<RNView, Props>(
	(
		{
			style,
			fullScreen,
			horizontal,
			cursorPointer,
			noSelect,
			children,
			...viewProps
		},
		ref,
	) => {
		const containerStyle = [style];

		if (horizontal) containerStyle.push(iStyles.horizontal);
		if (fullScreen) containerStyle.push(iStyles.fullScreen);
		if (cursorPointer) containerStyle.push(iStyles.cursorPointer);
		if (noSelect) containerStyle.push(iStyles.noSelect);

		return (
			<RNView ref={ref} style={containerStyle} {...viewProps}>
				{children}
			</RNView>
		);
	},
);

View.displayName = 'Stack';

export default View;
