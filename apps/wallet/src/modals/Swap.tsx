import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { runtime } from '@walless/core';
import type { ModalConfigs } from '@walless/gui';
import {
	AnimateDirections,
	BindDirections,
	modalActions,
	SwipeDownGesture,
} from '@walless/gui';
import type { Props as SwapProps } from 'features/Swap';
import SwapFeature from 'features/Swap';
import { useSafeAreaInsets } from 'utils/hooks';

import { ModalId } from './types';

type Props = {
	config: ModalConfigs;
	props: SwapProps;
};

const SwapModal: FC<Props> = ({ config, props }) => {
	const insets = useSafeAreaInsets();

	const safeAreaStyle: ViewStyle = {
		marginTop: insets.top || 20,
		paddingBottom: insets.bottom,
	};

	const handleClose = () => {
		modalActions.hide(config.id);
	};

	return (
		<SwipeDownGesture
			style={[styles.container, safeAreaStyle]}
			callbackOnClose={handleClose}
			gestureEnable={runtime.isMobile}
		>
			<SwapFeature {...props} />
		</SwipeDownGesture>
	);
};

export const showSwapModal = (props: SwapProps) => {
	modalActions.show({
		id: ModalId.Swap,
		bindingDirection: BindDirections.InnerBottom,
		animateDirection: AnimateDirections.Top,
		fullHeight: true,
		maskActiveOpacity: 0.1,
		component: ({ config }) => <SwapModal config={config} props={props} />,
	});
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#131C24',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		flexGrow: 1,
	},
});
