import { type ReactNode } from 'react';
import { type ViewStyle } from 'react-native';

import { type Props as HoverableProps } from '../Hoverable';

export type ContextMenuContainerProps = HoverableProps & {
	style?: ViewStyle;
	contentContainerStyle?: ViewStyle;
	children?: ReactNode;
	onContextMenu?: () => void;
};
