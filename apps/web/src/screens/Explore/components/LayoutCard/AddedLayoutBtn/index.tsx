import { type FC, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import {
	AnimateDirections,
	BindDirections,
	Button,
	modalActions,
} from '@walless/gui';
import { Check } from '@walless/icons';

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
			bindingRef: bindingRef,
			bindingDirection: BindDirections.TopRight,
			animateDirection: AnimateDirections.Inner,
		});
	};

	return (
		<Button style={styles.button} onPress={handlePress}>
			<View ref={bindingRef}>
				<Check size={24} color="#566674" />
			</View>
		</Button>
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
