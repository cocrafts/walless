import { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { TokenAccount } from '@walless/core';
import { Stack, Text } from '@walless/gui';
import { Eye, EyeOff } from '@walless/icons';
import { TokenRecord } from '@walless/storage';

interface Props {
	onHide: (next: boolean) => void;
	isPrivate?: boolean;
	token: TokenRecord;
}

export const WalletBalance: FC<Props> = ({ onHide, isPrivate, token }) => {
	const { balance } = token.account;

	return (
		<Stack marginVertical={5}>
			<Stack horizontal alignItems="center" gap={10}>
				<Text fontSize={38} fontWeight={'500'}>{`${
					isPrivate ? '***' : balance
				} SOL`}</Text>
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={() => onHide?.(!isPrivate)}
				>
					{isPrivate ? <EyeOff size={20} /> : <Eye size={20} />}
				</TouchableOpacity>
			</Stack>
			<Text opacity={0.7}>{`~ ${
				isPrivate ? '***' : getEstimatedValue(token.account)
			} USD`}</Text>
		</Stack>
	);
};

export default WalletBalance;

const getEstimatedValue = (account: TokenAccount) => {
	if (account.balance === 0) {
		return '0';
	} else if (account.price) {
		return account.balance * account.price;
	}

	return '';
};
