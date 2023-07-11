import type { FC, ReactNode, RefObject } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { View } from 'react-native';
import {
	AnimateDirections,
	BindDirections,
	Hoverable,
	modalActions,
} from '@walless/gui';
import { Check } from '@walless/icons';

import HoverAnnouncement from './HoverAnnouncement';

interface Props {
	style?: StyleProp<ViewStyle>;
	icon?: ReactNode;
	hoverTitle?: string;
	onPress: () => void;
	forwardedRef?: RefObject<View>;
}

export const LayoutButton: FC<Props> = ({
	style,
	icon,
	hoverTitle,
	onPress,
	forwardedRef,
}) => {
	const handleHoverIn = () => {
		modalActions.show({
			id: 'layout-button-hover',
			component: HoverAnnouncement,
			context: { title: hoverTitle },
			withoutMask: true,
			bindingRef: forwardedRef,
			bindingDirection: BindDirections.TopRight,
			animateDirection: AnimateDirections.Inner,
			positionOffset: {
				y: -4,
			},
		});
	};

	const handleHoverOut = () => {
		modalActions.destroy('layout-button-hover');
	};

	return (
		<Hoverable
			style={style}
			onHoverIn={() => {
				hoverTitle && handleHoverIn();
			}}
			onHoverOut={() => {
				hoverTitle && handleHoverOut();
			}}
			hoverOpacity={1}
			onPress={onPress}
		>
			<View ref={forwardedRef}>
				{icon ?? <Check color="#566674" size={20} />}
			</View>
		</Hoverable>
	);
};

export default LayoutButton;
