import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text, View } from '@walless/gui';
import { ChevronLeft } from '@walless/icons';

type Props = {
	onBack: () => void;
};

const SelectModalHeader: FC<Props> = ({ onBack }) => {
	return (
		<View style={styles.headerContainer}>
			<Text style={styles.title}>Select a token</Text>
			<Button style={styles.backButton} onPress={onBack}>
				<ChevronLeft />
			</Button>
		</View>
	);
};

export default SelectModalHeader;

const styles = StyleSheet.create({
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
