import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Hoverable, Text, View } from '@walless/gui';
import { Eye, EyeOff } from '@walless/icons';

interface Props {
	userName?: string;
	hideBalance: boolean;
	totalBalance?: number;
}

const iconProps = {
	color: '#ffffff',
	size: 18,
};

export const TotalBalance: FC<Props> = ({
	userName = '',
	hideBalance = false,
	totalBalance = 0,
}) => {
	return (
		<View>
			<Text
				style={styles.text}
			>{`Hi ${userName} 👋, your balance today: `}</Text>
			<View horizontal style={styles.balanceContainer}>
				<Hoverable>
					{hideBalance ? <EyeOff {...iconProps} /> : <Eye {...iconProps} />}
				</Hoverable>
				<Text style={styles.balance}>{`$ ${
					hideBalance ? '* * * * *' : totalBalance
				}`}</Text>
			</View>
		</View>
	);
};

export default TotalBalance;

const styles = StyleSheet.create({
	text: {
		color: '#566674',
	},
	balanceContainer: {
		alignItems: 'center',
		gap: 10,
		paddingVertical: 5,
	},
	balance: {
		fontSize: 28,
		fontWeight: '600',
		color: '#ffffff',
	},
});
