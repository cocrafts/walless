import type { ReactNode } from 'react';
import { forwardRef, useMemo } from 'react';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import { View as RNView } from 'react-native';

import type { DynamicFlags } from '../utils/style';
import { iStyles } from '../utils/style';

type Props = DynamicFlags &
	ViewProps & {
		style?: StyleProp<ViewStyle>;
		children?: ReactNode;
	};

export const View = forwardRef<RNView, Props>(
	(
		{
			style,
			fullscreen,
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
				fullscreen && iStyles.fullScreen,
				cursorPointer && iStyles.cursorPointer,
				noSelect && iStyles.noSelect,
				style,
			];
		}, [style, horizontal, fullscreen, cursorPointer, noSelect]);

		return (
			<RNView ref={ref} style={containerStyle} {...viewProps}>
				{children}
			</RNView>
		);
	},
);

View.displayName = 'Stack';

export default View;
