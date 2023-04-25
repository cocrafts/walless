import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { TokenAccount } from '@walless/core';
import { Hoverable, Text, View } from '@walless/gui';
import { Eye, EyeOff } from '@walless/icons';
import { TokenRecord } from '@walless/storage';

interface Props {
	onHide: (next: boolean) => void;
	isPrivate?: boolean;
	token: TokenRecord;
}

export const WalletBalance: FC<Props> = ({ onHide, isPrivate, token }) => {
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
				<Text style={balanceTextStyle}>
					{getBalanceDisplay(token, isPrivate)}
				</Text>
			</View>
			<Text style={styles.estimationText}>
				{getEstimatedDisplay(token.account, isPrivate)}
			</Text>
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

const getEstimatedDisplay = (account: TokenAccount, isPrivate?: boolean) => {
	const balance = parseFloat(account.balance);

	if (isPrivate) {
		return ' ';
	} else if (balance === 0) {
		return '~ 0 USD';
	} else if (account.price) {
		return `~ ${balance * account.price} USD`;
	}

	return '';
};

const getBalanceDisplay = (
	{ metadata, account }: TokenRecord,
	isPrivate?: boolean,
) => {
	const balance = parseFloat(account.balance);

	if (isPrivate) {
		return '******';
	} else if (balance === 0) {
		return `0 ${metadata?.symbol}`;
	}

	return `${account.balance} ${metadata?.symbol}`;
};
