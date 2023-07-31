import { Transaction } from '@walless/engine/solana/transaction';
import { View } from '@walless/gui';
import { type FC } from 'react';

interface Props {
	history: Transaction[];
}

const ActivityTab: FC<Props> = ({ history }) => {
	return (
		<View>
			{history.map((item, index) => (
				<View key={index}>{item.amount}</View>
			))}
		</View>
	);
};

export default ActivityTab;
