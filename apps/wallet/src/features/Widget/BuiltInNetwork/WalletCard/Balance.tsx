import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Hoverable, Text, View } from '@walless/gui';
import { Eye, EyeOff } from '@walless/icons';
import TotalPnL from 'components/TotalPnL';
import { getValuationDisplay } from 'utils/helper';

interface Props {
	onHide: (next: boolean) => void;
	hideBalance: boolean;
	valuation?: number;
	pnl?: number;
}

export const WalletBalance: FC<Props> = ({
	onHide,
	hideBalance,
	valuation = 0,
	pnl = 0,
}) => {
	const balanceTextStyle = [
		styles.balanceText,
		hideBalance && styles.protectedBalance,
	];
	const pnlRates = (pnl / (valuation != 0 ? valuation : 1)) * 100;

	return (
		<View style={styles.container}>
			<View style={styles.balanceContainer}>
				<Hoverable onPress={() => onHide?.(!hideBalance)}>
					{hideBalance ? <EyeOff size={18} /> : <Eye size={18} />}
				</Hoverable>
				<Text style={balanceTextStyle}>
					{getValuationDisplay(valuation, hideBalance)}
				</Text>
			</View>
			<View style={styles.pnLContainer}>
				<TotalPnL
					value={Math.round(pnl * 100) / 100}
					percentage={Math.round(pnlRates * 100) / 100}
					isDarkTheme={false}
				/>
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
		gap: 10,
	},
	balanceText: {
		height: 42,
		fontSize: 35,
		fontWeight: '500',
		color: 'white',
	},
	protectedBalance: {
		paddingTop: 7,
	},
	estimationText: {
		opacity: 0.6,
		marginLeft: 34,
	},
	pnLContainer: {
		paddingLeft: 10,
	},
});
