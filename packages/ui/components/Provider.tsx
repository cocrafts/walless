import { FC, ReactChild, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { modalActions } from '../utils/state/modal';

import ModalManager from './ModalManager';

interface Props {
	children?: ReactChild;
	theme?: undefined;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export const Provider: FC<Props> = ({ children, theme }) => {
	const [ready, setReady] = useState(false);
	const containerRef = useRef<View>(null);

	useEffect(() => {
		modalActions.setContainerRef(containerRef);
		console.log(theme);
		setReady(true);
	}, []);

	return (
		<View ref={containerRef} style={styles.container}>
			{(ready && children) as undefined}
			<ModalManager />
		</View>
	);
};
