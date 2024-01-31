import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@walless/gui';
import { ChevronLeft } from '@walless/icons';

import { swapActions } from './context';

const SelectToToken: FC = () => {
	const handleBack = () => {
		swapActions.closeSelectToken('to');
	};

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.title}>Select a token</Text>
				<Button style={styles.backButton} onPress={handleBack}>
					<ChevronLeft />
				</Button>
			</View>
		</View>
	);
};

export default SelectToToken;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#131C24',
		paddingTop: 10,
		paddingBottom: 28,
		paddingHorizontal: 28,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	title: {
		color: '#FFFFFF',
		fontWeight: '500',
		fontSize: 20,
	},
	backButton: {
		backgroundColor: 'transparent',
		paddingHorizontal: 0,
	},
});
