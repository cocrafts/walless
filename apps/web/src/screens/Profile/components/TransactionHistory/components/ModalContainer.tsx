import type { FC, ReactNode } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { modalActions, Text, View } from '@walless/gui';
import { Times } from '@walless/icons';

interface Props {
	title: string;
	children: ReactNode;
}

const ModalContainer: FC<Props> = ({ title, children }) => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View />
				<Text style={styles.title}>{title}</Text>
				<TouchableOpacity
					onPress={() => modalActions.hide('transactionDetails')}
				>
					<Times size={16} />
				</TouchableOpacity>
			</View>
			{children}
		</View>
	);
};

export default ModalContainer;

const styles = StyleSheet.create({
	container: {
		maxWidth: 400,
		backgroundColor: '#19232C',
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		paddingHorizontal: 30,
		paddingVertical: 16,
		gap: 20,
		overflow: 'hidden',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	title: {
		fontSize: 20,
	},
});
