import type { FC, ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { modalActions, Text, View } from '@walless/gui';
import { Times } from '@walless/icons';
import { useUniversalInsets } from 'utils/hooks';

interface Props {
	id: string;
	title: string;
	children: ReactNode;
}

const ModalContainer: FC<Props> = ({ id, title, children }) => {
	const inset = useUniversalInsets();
	const containerStyle: ViewStyle = {
		paddingBottom: Math.max(inset.bottom, 16),
	};

	const handleHideModal = () => {
		modalActions.hide(id);
	};

	return (
		<View style={[styles.container, containerStyle]}>
			<View style={styles.header}>
				<View />
				<Text style={styles.title}>{title}</Text>
				<TouchableOpacity onPress={handleHideModal}>
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
		backgroundColor: '#19232C',
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		paddingHorizontal: 18,
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
