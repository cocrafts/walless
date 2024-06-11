import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Times } from '@walless/icons';

interface Props {
	content: string;
	onPressClose?: () => void;
	style?: ViewStyle;
}

const CLOSE_ICON_SIZE = 12;

const ModalHeader: FC<Props> = ({ style, content, onPressClose }) => {
	return (
		<View style={[styles.container, style]}>
			<View style={{ width: CLOSE_ICON_SIZE }} />
			<Text style={styles.headerText}>{content}</Text>
			<TouchableOpacity onPress={onPressClose}>
				<Times size={CLOSE_ICON_SIZE} color="white" />
			</TouchableOpacity>
		</View>
	);
};

export default ModalHeader;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	headerText: {
		fontSize: 20,
		color: 'white',
	},
});
