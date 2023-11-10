import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '@walless/gui';

interface Props {
	amount: number;
	type: 'sent' | 'received';
	status?: 'success' | 'pending' | 'failed';
	tokenSymbol?: string;
}

export const ItemAmount: FC<Props> = ({
	amount,
	type,
	tokenSymbol = 'Unknown',
	status = 'success',
}) => {
	let color = '#ffffff';
	let changeBalance = `- ${amount}`;

	if (type === 'sent') {
		if (status === 'failed') {
			color = '#DE4747';
		}
	} else {
		color = '#2FC879';
		changeBalance = `+ ${amount}`;
	}

	const handleRemoveRedundantCharacters = (text: string) =>
		text.replaceAll('\u0000', '');

	return (
		<Text
			style={[styles.balance, { color: color }]}
			numberOfLines={1}
			ellipsizeMode={'tail'}
		>
			{changeBalance} {handleRemoveRedundantCharacters(tokenSymbol)}
		</Text>
	);
};

export default ItemAmount;

const styles = StyleSheet.create({
	balance: {
		textAlign: 'right',
	},
});
