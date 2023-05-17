import { type FC, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import {
	AnimateDirections,
	BindDirections,
	Hoverable,
	modalActions,
} from '@walless/gui';
import { Check } from '@walless/icons';

import AddedLayoutAnnouncement from './AddedLayoutAnnouncement';
import RemoveLayoutBtn from './RemoveLayoutBtn';

interface Props {
	onRemove: () => void;
}

const AddedLayoutBtn: FC<Props> = ({ onRemove }) => {
	const bindingRef = useRef(null);

	const handlePress = () => {
		modalActions.show({
			id: 'remove-layout-modal',
			component: ({ config }) => (
				<RemoveLayoutBtn config={config} onRemove={onRemove} />
			),
			maskActiveOpacity: 0,
			positionOffset: {
				y: -4,
			},
			bindingRef: bindingRef,
			bindingDirection: BindDirections.TopRight,
			animateDirection: AnimateDirections.Inner,
		});
	};

	const handleHoverIn = () => {
		modalActions.show({
			id: 'added-layout-anouncement',
			component: AddedLayoutAnnouncement,
			withoutMask: true,
			bindingRef: bindingRef,
			bindingDirection: BindDirections.TopRight,
			animateDirection: AnimateDirections.Inner,
			positionOffset: {
				y: -4,
			},
		});
	};

	const handleHoverOut = () => {
		modalActions.destroy('added-layout-anouncement');
	};

	return (
		<Hoverable
			style={styles.button}
			onPress={handlePress}
			onHoverIn={handleHoverIn}
			onHoverOut={handleHoverOut}
			hoverOpacity={1}
		>
			<View ref={bindingRef}>
				<Check size={24} color="#566674" />
			</View>
		</Hoverable>
	);
};

const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#1F2A34',
		width: 30,
		height: 30,
		paddingVertical: 4,
		paddingHorizontal: 4,
		borderRadius: 8,
	},
});

export default AddedLayoutBtn;
