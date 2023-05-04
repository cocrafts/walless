import { type FC } from 'react';
import { type GestureResponderEvent } from 'react-native';

import Hoverable from '../Hoverable';

import { type ContextMenuContainerProps } from './shared';

export const ContextMenuContainer: FC<ContextMenuContainerProps> = ({
	style,
	contentContainerStyle,
	children,
	onContextMenu,
	onLongPress,
	...otherProps
}) => {
	const handleLongPress = (e: GestureResponderEvent) => {
		onLongPress?.(e);
		onContextMenu?.();
	};

	return (
		<Hoverable
			style={[style, contentContainerStyle]}
			onLongPress={handleLongPress}
			{...otherProps}
		>
			{children}
		</Hoverable>
	);
};

export default ContextMenuContainer;
