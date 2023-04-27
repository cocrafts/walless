import { useRef } from 'react';
import {
	AnimateDirections,
	BindDirections,
	Hoverable,
	modalActions,
	Text,
	View,
} from '@walless/gui';

import Dropdown from './Dropdown';
import { SelectionContext, styles } from './shared';

export const Select = <T extends object>({
	selected,
	title,
	items,
	getRequiredFields,
	onSelect,
}: SelectionContext<T>) => {
	const inputRef = useRef(null);

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
				items,
				getRequiredFields,
				onSelect,
			},
		});
	};

	return (
		<View ref={inputRef}>
			<Hoverable style={styles.button} onPress={openModal}>
				<Text style={styles.text}>{title}</Text>
			</Hoverable>
		</View>
	);
};
