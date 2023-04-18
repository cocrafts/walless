import { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { TokenAccount } from '@walless/core';
import { Eye, EyeOff } from '@walless/icons';
import { TokenRecord } from '@walless/storage';
import { Stack, Text } from '@walless/ui';

interface Props {
	onHide: (next: boolean) => void;
	isPrivate?: boolean;
	token: TokenRecord;
}

export const WalletBalance: FC<Props> = ({ onHide, isPrivate, token }) => {
	return (
		<Stack marginVertical={8}>
			<Stack horizontal alignItems="center" gap={10}>
				<Text fontSize={35} fontWeight="500">
					{getBalanceDisplay(token, isPrivate)}
				</Text>
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={() => onHide?.(!isPrivate)}
				>
					{isPrivate ? <EyeOff size={20} /> : <Eye size={20} />}
				</TouchableOpacity>
			</Stack>
			<Text fontWeight="200">
				{getEstimatedDisplay(token.account, isPrivate)}
			</Text>
		</Stack>
	);
};

export default WalletBalance;

const getEstimatedDisplay = (account: TokenAccount, isPrivate?: boolean) => {
	if (isPrivate) {
		return '***';
	} else if (account.balance === 0) {
		return '~ 0 USD';
	} else if (account.price) {
		return `~ ${account.balance * account.price} USD`;
	}

	return '';
};

const getBalanceDisplay = (
	{ symbol, account }: TokenRecord,
	isPrivate?: boolean,
) => {
	if (isPrivate) {
		return '***';
	} else if (account.balance === 0) {
		return `0 ${symbol}`;
	}

	return `${account.balance} ${symbol}`;
};
