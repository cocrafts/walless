import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSnapshot } from 'utils/hook';
import { modalState } from 'utils/state/modal';

import ModalContainer from './ModalContainer';

export const ModalManager: React.FC = () => {
	const { hashmap } = useSnapshot(modalState);
	const instances = Object.values(hashmap);

	return (
		<View style={styles.container} pointerEvents="box-none">
			{instances.map((item) => (
				<ModalContainer key={item.id} item={item} />
			))}
		</View>
	);
};

export default ModalManager;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
});
