import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Button, View } from '@walless/gui';
import { ChevronLeft } from '@walless/icons';

interface Props {
	onBack: () => void;
}

export const Header: FC<Props> = ({ onBack }) => {
	return (
		<View style={styles.container}>
			<Button style={styles.closeButton} onPress={onBack}>
				<ChevronLeft size={16} />
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		width: 336,
	},
	closeButton: {
		backgroundColor: 'none',
		paddingHorizontal: 0,
		paddingVertical: 0,
	},
});
