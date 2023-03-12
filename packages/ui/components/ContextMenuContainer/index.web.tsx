import React, { FC, useCallback } from 'react';

interface Props {
	children: React.ReactNode;
	onContextMenu?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const ContextMenuContainer: FC<Props> = ({
	children,
	onContextMenu,
}) => {
	const handleContextMenu = useCallback(
		(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
			if (onContextMenu) {
				onContextMenu(event);
			}
		},
		[onContextMenu],
	);

	return <div onContextMenu={handleContextMenu}>{children}</div>;
};

export default ContextMenuContainer;
