import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

interface Props {
	value: number;
	percentage: number;
	isDarkTheme: boolean;
}

const TotalPnL: FC<Props> = ({ value, percentage, isDarkTheme = false }) => {
	const isLost = value < 0;

	return (
		<View style={styles.container}>
			<Text
				style={
					isDarkTheme
						? isLost
							? styles.darkThemeLostValue
							: styles.darkThemeProfitValue
						: isLost
							? styles.lightThemeLostValue
							: styles.lightThemeProfitValue
				}
			>
				${value}
			</Text>
			<View
				style={[
					styles.percentageContainer,
					isDarkTheme
						? styles.darkThemeProfitPercentageContainer
						: styles.lightThemeProfitPercentageContainer,
				]}
			>
				<Text
					style={
						isDarkTheme
							? isLost
								? styles.darkThemeLostPercentage
								: styles.darkThemeProfitPercentage
							: isLost
								? styles.lightThemeLostPercentage
								: styles.lightThemeProfitPercentage
					}
				>
					{!isLost && '+'}
					{percentage}%
				</Text>
			</View>
		</View>
	);
};

export default TotalPnL;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	lightThemeProfitValue: {
		color: '#60C591',
		fontSize: 20,
	},
	darkThemeProfitValue: {
		color: '#173124',
		fontSize: 20,
	},
	lightThemeLostValue: {
		color: '#AE3939',
		fontSize: 20,
	},
	darkThemeLostValue: {
		color: '#173124',
		fontSize: 20,
	},
	lightThemeProfitPercentage: {
		color: '#60C591',
	},
	lightThemeLostPercentage: {
		color: '#AE3939',
	},
	darkThemeProfitPercentage: {
		color: '#173124',
	},
	darkThemeLostPercentage: {
		color: '#173124',
	},
	percentageContainer: {
		borderRadius: 4,
		paddingVertical: 4,
		paddingHorizontal: 8,
	},
	lightThemeProfitPercentageContainer: {
		backgroundColor: '#AE393933',
	},
	darkThemeProfitPercentageContainer: {
		backgroundColor: '#60C591',
	},
	lightThemeLostPercentageContainer: {
		backgroundColor: '#AE393933',
	},
	darkThemeLostPercentageContainer: {
		backgroundColor: '#AE3939',
	},
});
