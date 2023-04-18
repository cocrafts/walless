import { type FC, type ReactNode } from 'react';
import { type ViewStyle, View, ViewProps } from 'react-native';

import { DynamicFlags, extractDynamicStyle } from '../utils/style';

type Props = DynamicFlags &
	ViewProps & {
		style?: ViewStyle;
		children?: ReactNode;
	};

export const Stack: FC<Props> = ({
	style,
	float,
	row,
	children,
	...viewProps
}) => {
	const dynamicStyles = extractDynamicStyle({ float, row });

	if (style) dynamicStyles.push(style);

	return (
		<View style={dynamicStyles} {...viewProps}>
			{children}
		</View>
	);
};

export default Stack;
