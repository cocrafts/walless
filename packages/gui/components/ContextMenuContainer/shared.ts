import { type StyleProp, type ViewStyle } from 'react-native';

import { type Props as HoverableProps } from '../Hoverable';

export type ContextMenuContainerProps = HoverableProps & {
	contentContainerStyle?: StyleProp<ViewStyle>;
	onContextMenu?: () => void;
};
