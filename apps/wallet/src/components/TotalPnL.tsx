import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

interface Props {
	value: number;
	percentage: number;
	isDarkTheme: boolean;
	numDigit: number;
}

const TotalPnL: FC<Props> = ({
	value,
	percentage,
	isDarkTheme = false,
	numDigit = 2,
}) => {
	if (numDigit <= 0) { numDigit = 2 }
	const baseDigit = 10 ** numDigit;
	value = Math.round(value * baseDigit) / baseDigit;
	percentage = Math.round(percentage * baseDigit) / baseDigit;
	const isLost = value < 0;
	const isProfit = value > 0;

	if (percentage !== 0) {
		return (
			<View style={styles.container}>
				<Text
					style={[
						styles.pnlTextBase,
						styles.pnlValueBase,
						isDarkTheme ? styles.darkThemePnLText : styles.lightThemePnLText,
					]}
				>
					{isLost ? `≈ -$${-value}` : isProfit ? `≈ +$${value}` : null}
				</Text>
				<View
					style={[
						styles.percentageContainerBase,
						isLost
							? styles.LostPercentageContainer
							: styles.ProfitPercentageContainer,
					]}
				>
					<Text style={[styles.pnlTextBase]}>
						{isLost ? `${percentage}%` : isProfit ? `+${percentage}%` : null}
					</Text>
				</View>
			</View>
		);
	}
};

export default TotalPnL;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	pnlTextBase: {
		color: '#ffffff',
	},
	pnlValueBase: {
		fontSize: 20,
	},
	darkThemePnLText: {
		color: '#babdc0',
	},
	lightThemePnLText: {
		color: '#ffffff',
	},
	percentageContainerBase: {
		borderRadius: 4,
		paddingVertical: 4,
		paddingHorizontal: 8,
	},
	ProfitPercentageContainer: {
		backgroundColor: '#29985F',
	},
	LostPercentageContainer: {
		backgroundColor: '#DB1901',
	},
});
