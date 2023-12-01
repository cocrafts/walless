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
import { keyState } from '@walless/engine';
import type { ModalConfigs } from '@walless/gui';
import { AnimatedView, modalActions } from '@walless/gui';
import { useSnapshot } from 'valtio';

import ModalHeader from '../../components/ModalHeader';
import ModalWrapper from '../../components/ModalWrapper';
import { getNetworkInfo } from '../../utils';

import Slider, {
	type IndicatorOption,
	type SlideOption,
} from './components/Slider';
import WalletCard, { type WalletProps } from './components/WalletCard';
import WalletCardIndicator from './components/WalletCardIndicator';

const ReceiveModal: FC<{ config: ModalConfigs }> = ({ config }) => {
	const keyMap = useSnapshot(keyState);

	const walletList: WalletProps[] = [];
	Object.values(keyMap).forEach((keyMap) => {
		keyMap.forEach((key) => {
			const networkInfo = getNetworkInfo(key.network);
			walletList.push({
				network: key.network.charAt(0).toUpperCase() + key.network.slice(1),
				networkIcon: networkInfo?.icon ?? { uri: '/img/...' },
				address: key._id,
			});
		});
	});

	const moveSelectedItemToTop = (
		items: WalletProps[],
		selectedItem: string,
	) => {
		const filteredItems = items.filter(
			(item) => item.network.toLowerCase() !== selectedItem,
		);
		const selectedItems = items.filter(
			(item) => item.network.toLowerCase() === selectedItem,
		);
		return [...selectedItems, ...filteredItems];
	};

	let items: SlideOption[];
	if (config.context) {
		const { network } = config.context as { network: Networks };

		items = moveSelectedItemToTop(walletList, network).map((wallet, index) => ({
			id: `${index}`,
			component: WalletCard,
			context: wallet,
		}));
	} else {
		items = walletList.map((wallet, index) => ({
			id: `${index}`,
			component: WalletCard,
			context: wallet,
		}));
	}

	const indicator: IndicatorOption = {
		id: 'indicator',
		component: WalletCardIndicator,
		context: { cardList: walletList },
	};

	const handleClose = () => {
		modalActions.hide(config?.id as string);
	};

	const offset = useSharedValue(0);
	const context = useSharedValue(0);
	const modalHeight = useSharedValue(0);

	const pan = Gesture.Pan()
		.onStart(() => {
			context.value = offset.value;
		})
		.onUpdate((event) => {
			const newPosition = event.translationY + context.value;
			if (newPosition > 0) {
				offset.value = newPosition;
			}
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
					style={animatedStyle}
					onLayout={({ nativeEvent }) => {
						modalHeight.value = nativeEvent.layout.height;
					}}
				>
					<ModalWrapper>
						<ModalHeader content="Receive" onPressClose={handleClose} />
						<Slider
							style={styles.sliderContainer}
							items={items}
							indicator={indicator}
						/>
					</ModalWrapper>
				</AnimatedView>
			</GestureDetector>
		</GestureHandlerRootView>
	);
};

export default ReceiveModal;

const styles = StyleSheet.create({
	sliderContainer: {
		gap: 22,
		overflow: 'hidden',
	},
});
