import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Hoverable, Text } from '@walless/gui';
import { Eye, EyeOff } from '@walless/icons';
import TotalPnL from 'components/TotalPnL';
import { useSettings, useTokens } from 'utils/hooks';

interface Props {
	value: number;
}

const TokenValue: FC<Props> = ({ value }) => {
	const { setting, setPrivacy } = useSettings();
	const { valuation, pnl } = useTokens();

	const handleToggleTokenValue = async () => {
		setPrivacy(!setting.hideBalance);
	};
	const pnlRates = (pnl / (valuation != 0 ? valuation : 1)) * 100;

	return (
		<View style={styles.container}>
			<Text style={styles.headingText}>Token value</Text>
			<View style={styles.balanceAndPercentageContainer}>
				<View style={styles.balanceContainer}>
					<Text style={styles.balanceText}>
						{setting.hideBalance ? '****' : '$' + value.toFixed(2)}
					</Text>
					<Hoverable onPress={handleToggleTokenValue}>
						{setting.hideBalance ? (
							<Eye size={20} color="#566674" />
						) : (
							<EyeOff size={20} color="#566674" />
						)}
					</Hoverable>
				</View>
				<TotalPnL
					value={pnl}
					percentage={pnlRates}
					isDarkTheme={true}
					numDigit={2}
				/>
			</View>
		</View>
	);
};

export default TokenValue;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		gap: 8,
	},
	headingText: {
		textAlign: 'center',
		color: '#566674',
	},
	balanceContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	balanceText: {
		color: '#FFFFFF',
		fontSize: 40,
		fontWeight: '500',
	},
	balanceAndPercentageContainer: {
		alignItems: 'center',
	},
});
