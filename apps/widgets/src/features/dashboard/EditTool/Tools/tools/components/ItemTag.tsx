import type { FC, ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text, View } from '@walless/gui';
import { Times } from '@walless/icons';

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
			<Text>{label}</Text>
			<Button style={styles.buttonContainer} onPress={handleRemove}>
				<Times size={12} />
			</Button>
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
