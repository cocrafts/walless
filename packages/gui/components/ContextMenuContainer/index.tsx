import type { FC } from 'react';

import Hoverable from '../Hoverable';

import type { ContextMenuContainerProps } from './shared';

export const ContextMenuContainer: FC<ContextMenuContainerProps> = ({
	style,
	contentContainerStyle,
	children,
	onLongPress,
	...otherProps
}) => {
	return (
		<Hoverable
			style={[style, contentContainerStyle]}
			onLongPress={onLongPress}
			{...otherProps}
		>
			{children}
		</Hoverable>
	);
};

export default ContextMenuContainer;
