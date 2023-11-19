import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import { Check, Clock, Times } from '@walless/icons';

interface Props {
	status?: 'Success' | 'Pending' | 'Failed';
}

const TransactionStatus: FC<Props> = ({ status = 'success' }) => {
	const capitalize = (text: string) =>
		text.charAt(0).toUpperCase() + text.slice(1);

	const icon =
		status === 'success' ? (
			<Check size={12} />
		) : status === 'pending' ? (
			<Clock size={12} />
		) : (
			<Times size={12} />
		);

	const color =
		status === 'success'
			? '#2FC879'
			: status === 'pending'
			? '#E0BD3F'
			: '#CC3838';

	const iconContainerStyle = {
		backgroundColor: color,
	};

	const textStyle = {
		color: color,
	};

	return (
		<View style={styles.container}>
			<View style={[styles.iconContainer, iconContainerStyle]}>{icon}</View>
			<Text style={textStyle}>{capitalize(status)}</Text>
		</View>
	);
};

export default TransactionStatus;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	iconContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 14,
		height: 14,
		borderRadius: 14,
	},
});
