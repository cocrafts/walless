import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Hoverable, Text, View } from '@walless/gui';
import { Eye, EyeOff } from '@walless/icons';

interface Props {
	onHide: (next: boolean) => void;
	isPrivate?: boolean;
}

export const WalletBalance: FC<Props> = ({ onHide, isPrivate }) => {
	const balanceTextStyle = [
		styles.balanceText,
		isPrivate && styles.protectedBalance,
	];

	return (
		<View style={styles.container}>
			<View style={styles.balanceContainer}>
				<Hoverable onPress={() => onHide?.(!isPrivate)}>
					{isPrivate ? <EyeOff size={18} /> : <Eye size={18} />}
				</Hoverable>
				<Text style={balanceTextStyle}>$0.00</Text>
			</View>
		</View>
	);
};

export default WalletBalance;

const styles = StyleSheet.create({
	container: {
		marginVertical: 8,
	},
	balanceContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 5,
		paddingBottom: 20,
		gap: 10,
	},
	balanceText: {
		height: 42,
		fontSize: 35,
		fontWeight: '500',
	},
	protectedBalance: {
		paddingTop: 7,
	},
	estimationText: {
		opacity: 0.6,
		marginLeft: 34,
	},
});
