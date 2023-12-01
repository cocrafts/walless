import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import {
	Gesture,
	GestureDetector,
	GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import type { Networks } from '@walless/core';
import type { ModalConfigs } from '@walless/gui';
import { AnimatedView, modalActions } from '@walless/gui';
import { utils } from '@walless/ioc';
import type { CollectibleDocument } from '@walless/store';

import SendFeature from '../features/Send';
import {
	checkValidAddress,
	getTransactionAbstractFee,
	getTransactionFee,
} from '../utils';
import { useNfts, usePublicKeys, useTokens } from '../utils/hooks';

export interface ModalContext {
	layoutNetwork?: Networks;
	collectible?: CollectibleDocument;
}

export const SendModal: FC<{ config: ModalConfigs }> = ({ config }) => {
	const { layoutNetwork, collectible } = config.context as ModalContext;
	const { tokens } = useTokens(layoutNetwork);
	const { collectibles, collections } = useNfts(layoutNetwork);
	const addressList = usePublicKeys();

	const handleClose = () => {
		modalActions.hide(config.id as string);
	};

	const offset = useSharedValue(0);
	const context = useSharedValue(0);
	const modalHeight = useSharedValue(0);

	const pan = Gesture.Pan()
		.onStart(() => {
			context.value = offset.value;
		})
		.onUpdate((event) => {
			offset.value = event.translationY + context.value;
		})
		.onEnd((event) => {
			const newPosition = event.translationY + context.value;
			if (newPosition > 100) {
				offset.value = withTiming(modalHeight.value);
				runOnJS(handleClose)();
			} else {
				offset.value = withTiming(0);
			}
		});

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: offset.value }],
		};
	});

	return (
		<GestureHandlerRootView>
			<GestureDetector gesture={pan}>
				<AnimatedView
					style={[styles.container, animatedStyle]}
					onLayout={({ nativeEvent }) => {
						modalHeight.value = nativeEvent.layout.height;
					}}
				>
					<SendFeature
						initCollectible={collectible}
						tokens={tokens}
						tokenForFee={tokens[0]}
						nftCollections={collections}
						nftCollectibles={collectibles}
						publicKeys={addressList}
						// TODO: resolve this with gasilon
						getTransactionFee={getTransactionFee}
						getTransactionAbstractFee={getTransactionAbstractFee}
						onClose={handleClose}
						checkValidAddress={checkValidAddress}
						createAndSendTransaction={utils.createAndSend}
						network={layoutNetwork}
					/>
				</AnimatedView>
			</GestureDetector>
		</GestureHandlerRootView>
	);
};

export default SendModal;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#131C24',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
});
