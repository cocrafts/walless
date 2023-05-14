import { type FC, type ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Times } from '@walless/icons';
import { Text } from '@walless/ui';

interface Props {
	id: string;
	label: string;
	prefix?: ReactNode;
	onRemove: (id: string) => void;
}

const ItemTag: FC<Props> = ({ id, label, prefix, onRemove }) => {
	const handleRemove = () => onRemove(id);

	return (
		<View style={styles.container}>
			{prefix}
			<Text paddingLeft={5}>{label}</Text>
			<TouchableOpacity style={styles.buttonContainer} onPress={handleRemove}>
				<Times size={12} />
			</TouchableOpacity>
		</View>
	);
};

export default ItemTag;

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 5,
		borderRadius: 6,
		backgroundColor: '#2C3741',
	},
	buttonContainer: {
		paddingLeft: 8,
		paddingRight: 12,
	},
});
