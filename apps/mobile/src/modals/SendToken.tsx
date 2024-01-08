import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { runtime } from '@walless/core';
import type { ModalConfigs } from '@walless/gui';
import {
	AnimateDirections,
	BindDirections,
	modalActions,
	SwipeDownGesture,
} from '@walless/gui';
import type { Props as SendFeatureProps } from 'src/features/Send';
import SendFeature from 'src/features/Send';

import { ModalId } from './internal';

type Props = {
	config: ModalConfigs;
	props: SendFeatureProps;
};

const SendModal: FC<Props> = ({ config, props }) => {
	const handleClose = () => {
		modalActions.hide(config.id);
	};

	return (
		<SwipeDownGesture
			style={styles.container}
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
		component: ({ config }) => <SendModal config={config} props={props} />,
	});
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#131C24',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
});
