import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text, View } from '@walless/gui';
import { Times } from '@walless/icons';

import { txActions } from '../context';

export const Header: FC = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Send</Text>
			<Button style={styles.closeButton} onPress={txActions.closeSendFeature}>
				<Times size={16} />
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		paddingBottom: 28,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	title: {
		fontSize: 20,
		color: '#FFFFFF',
	},
	closeButton: {
		backgroundColor: 'none',
		paddingHorizontal: 0,
		paddingVertical: 0,
	},
});
