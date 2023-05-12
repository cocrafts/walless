import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';

import Slides from './Slides';

export const AppContainer: FC = () => {
	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<Slides />
			</View>
		</View>
	);
};

export default AppContainer;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	innerContainer: {
		width: 410,
		height: 600,
		borderRadius: 12,
		backgroundColor: '#19232c',
		overflow: 'hidden',
	},
});
