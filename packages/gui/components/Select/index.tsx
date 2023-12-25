import { useRef } from 'react';
import { Image } from 'react-native';
import {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import {
	AnimateDirections,
	BindDirections,
	Hoverable,
	modalActions,
	Text,
	View,
} from '@walless/gui';
import { ChevronDown } from '@walless/icons';

import { AnimatedView } from '../aliased';

import Dropdown from './Dropdown';
import type { SelectionContext } from './shared';
import { styles } from './shared';

export const Select = <T extends object>({
	selected,
	title,
	notFoundText,
	items,
	getRequiredFields,
	onSelect,
	itemStyle,
	itemIconStyle,
	selectedItemStyle,
	selectedItemIconStyle,
}: SelectionContext<T>) => {
	const inputRef = useRef(null);
	const rotation = useSharedValue(0);

	let selectedMetadata;
	if (selected) {
		const metadata = getRequiredFields(selected);
		selectedMetadata = {
			name: metadata.name ?? 'Unknown',
			iconSrc: { uri: metadata.icon ?? 'img/send-token/unknown-token.jpeg' },
		};
	}

	const openModal = () => {
		const modalId = `dropdown-${title}`;
		rotation.value = withTiming(-180);
		modalActions.show({
			id: modalId,
			component: Dropdown,
			bindingRef: inputRef,
			bindingDirection: BindDirections.Bottom,
			animateDirection: AnimateDirections.Bottom,
			maskActiveOpacity: 0,
			positionOffset: { y: -5 },
			context: {
				selected,
				title,
				notFoundText,
				items,
				getRequiredFields,
				onSelect,
				itemStyle,
				itemIconStyle,
			},
			onBeforeHide: () => (rotation.value = withTiming(0)),
		});
	};

	const chevronAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ rotate: `${rotation.value}deg` }],
		};
	}, [rotation]);
	const borderAnimatedStyle = useAnimatedStyle(() => {
		const borderColor = interpolateColor(
			rotation.value,
			[-180, 0],
			['#49596a', 'transparent'],
			'RGB',
		);
		return {
			borderColor,
		};
	}, [rotation]);

	return (
		<View ref={inputRef}>
			<Hoverable
				style={[styles.button, selectedItemStyle, borderAnimatedStyle]}
				onPress={openModal}
			>
				<View style={styles.item}>
					{!selectedMetadata ? (
						<Text style={styles.text}>{title}</Text>
					) : (
						<View style={styles.item}>
							<Image
								source={selectedMetadata.iconSrc}
								style={[styles.itemIcon, selectedItemIconStyle]}
							/>
							<Text style={styles.itemName}>{selectedMetadata.name}</Text>
						</View>
					)}
				</View>
				<AnimatedView style={[styles.rightIcon, chevronAnimatedStyle]}>
					<ChevronDown size={16} color="#566674" />
				</AnimatedView>
			</Hoverable>
		</View>
	);
};
