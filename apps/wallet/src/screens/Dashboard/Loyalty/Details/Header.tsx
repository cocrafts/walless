import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@walless/gui';
import { ChevronLeft } from '@walless/icons';

interface Props {
	title: string;
	style?: ViewStyle;
	onGoBack: () => void;
}

const Header: FC<Props> = ({ title, style, onGoBack }) => {
	return (
		<View style={[styles.container, style]}>
			<TouchableOpacity hitSlop={24} style={styles.backIcon} onPress={onGoBack}>
				<ChevronLeft size={18} color="white" />
			</TouchableOpacity>
			<Text style={styles.title}>{title}</Text>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		marginTop: 16,
		marginBottom: 12,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 0,
		opacity: 0.8,
	},
	backIcon: {
		zIndex: 1,
		padding: 4,
	},
	title: {
		fontSize: 16,
		fontWeight: '500',
	},
});
