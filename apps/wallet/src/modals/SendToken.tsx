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
import type { Props as SendFeatureProps } from 'features/Send';
import SendFeature from 'features/Send';
import { useSafeAreaInsets } from 'utils/hooks';

import { ModalId } from './types';

type Props = {
	config: ModalConfigs;
	props: SendFeatureProps;
};

const SendModal: FC<Props> = ({ config, props }) => {
	const insets = useSafeAreaInsets();

	const safeAreaStyle: ViewStyle = {
		paddingBottom: insets.bottom,
		paddingTop: insets.top,
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
			<SendFeature {...props} />
		</SwipeDownGesture>
	);
};

export const showSendTokenModal = (props: SendFeatureProps) => {
	modalActions.show({
		id: ModalId.Send,
		bindingDirection: BindDirections.InnerBottom,
		animateDirection: AnimateDirections.Top,
		fullHeight: true,
		maskActiveOpacity: 0.1,
		positionOffset: { y: 32 },
		component: ({ config }) => <SendModal config={config} props={props} />,
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
