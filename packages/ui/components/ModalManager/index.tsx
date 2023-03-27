import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSnapshot } from 'valtio';

import { ModalConfigs, ModalState, modalState } from '../../utils/state/modal';

import { ModalContainer } from './ModalContainer';

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
});

export const ModalManager: FC = () => {
	const { hashmap } = useSnapshot<ModalState>(modalState);
	const instances = Object.values(hashmap);

	return (
		<View pointerEvents="box-none" style={styles.container}>
			{instances.map((item) => {
				return <ModalContainer key={item.id} item={item as ModalConfigs} />;
			})}
		</View>
	);
};

export default ModalManager;
