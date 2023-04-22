import { type ReactNode, forwardRef, useMemo } from 'react';
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
		const containerStyle = useMemo(() => {
			return [
				horizontal && iStyles.horizontal,
				fullScreen && iStyles.fullScreen,
				cursorPointer && iStyles.cursorPointer,
				noSelect && iStyles.noSelect,
				style,
			];
		}, [style, horizontal, fullScreen, cursorPointer, noSelect]);

		return (
			<RNView ref={ref} style={containerStyle} {...viewProps}>
				{children}
			</RNView>
		);
	},
);

View.displayName = 'Stack';

export default View;
