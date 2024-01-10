import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text, View } from '@walless/gui';
import { ChevronLeft, Times } from '@walless/icons';

import { txActions } from '../context';

interface Props {
	onBack: () => void;
}

export const Header: FC<Props> = ({ onBack }) => {
	return (
		<View style={styles.container}>
			<Button style={styles.closeButton} onPress={onBack}>
				<ChevronLeft size={16} />
			</Button>
			<Text style={styles.title}>Confirm transaction</Text>
			<Button style={styles.closeButton} onPress={txActions.closeSendFeature}>
				<Times size={16} />
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	title: {
		fontSize: 18,
		fontWeight: '500',
		color: '#FFFFFF',
	},
	closeButton: {
		backgroundColor: 'none',
		paddingHorizontal: 0,
		paddingVertical: 0,
	},
});
