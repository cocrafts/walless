import { useRef } from 'react';
import { Image } from 'react-native';
import {
	AnimateDirections,
	BindDirections,
	Hoverable,
	modalActions,
	Text,
	View,
} from '@walless/gui';
import { ChevronDown } from '@walless/icons';

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
		modalActions.show({
			id: modalId,
			component: Dropdown,
			bindingRef: inputRef,
			bindingDirection: BindDirections.InnerTop,
			animateDirection: AnimateDirections.Inner,
			positionOffset: { x: 0, y: -8 },
			maskActiveOpacity: 0,
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
		});
	};

	return (
		<View ref={inputRef}>
			<Hoverable style={[styles.button, selectedItemStyle]} onPress={openModal}>
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
				<View style={styles.rightIcon}>
					<ChevronDown size={16} color="#566674" />
				</View>
			</Hoverable>
		</View>
	);
};
