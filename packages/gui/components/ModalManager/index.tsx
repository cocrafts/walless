import { type FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSnapshot } from 'valtio';

import { type ModalState, modalState } from '../../states/modal';

import ModalContainer from './ModalContainer';

export const ModalManager: FC = () => {
	const { map } = useSnapshot<ModalState>(modalState);
	const instances = Array.from(map.values());

	return (
		<View pointerEvents="box-none" style={styles.container}>
			{instances.map((item) => {
				return <ModalContainer key={item.id} item={item} />;
			})}
		</View>
	);
};

export default ModalManager;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
});
