import { type FC, type MouseEventHandler } from 'react';
import { View } from 'react-native';

import Hoverable from '../Hoverable';

import { type ContextMenuContainerProps } from './shared';

export const ContextMenuContainer: FC<ContextMenuContainerProps> = ({
	style,
	contentContainerStyle,
	children,
	onContextMenu,
	...otherProps
}) => {
	const handleContextMenu: MouseEventHandler<HTMLDivElement> = ({
		nativeEvent,
	}) => {
		nativeEvent.preventDefault();
		onContextMenu?.();
	};

	return (
		<View style={style}>
			<div onContextMenu={handleContextMenu}>
				<Hoverable style={contentContainerStyle} {...otherProps}>
					{children}
				</Hoverable>
			</div>
		</View>
	);
};

export default ContextMenuContainer;
