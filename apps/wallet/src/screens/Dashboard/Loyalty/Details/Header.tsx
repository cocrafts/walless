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
		<TouchableOpacity
			style={[styles.container, style]}
			hitSlop={24}
			onPress={onGoBack}
		>
			<View style={styles.backIcon}>
				<ChevronLeft size={18} color="white" />
			</View>
			<Text style={styles.title}>{title}</Text>
		</TouchableOpacity>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
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
		color: 'white',
		fontSize: 16,
		fontWeight: '500',
	},
});
