import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '@walless/gui';

interface Props {
	amount: number;
	type: 'Sent' | 'Received';
	status?: 'Success' | 'Pending' | 'Failed';
	tokenSymbol?: string;
}

export const ItemAmount: FC<Props> = ({
	amount,
	type,
	tokenSymbol = 'Unknown',
	status = 'Success',
}) => {
	let color = '#ffffff';
	let changeBalance = `- ${parseFloat(amount.toFixed(5))}`;

	if (type === 'Sent') {
		if (status === 'Failed') {
			color = '#DE4747';
		}
	} else {
		color = '#2FC879';
		changeBalance = `+ ${parseFloat(amount.toFixed(5))}`;
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
