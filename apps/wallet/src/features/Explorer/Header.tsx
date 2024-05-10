import { StyleSheet } from 'react-native';
import { Hoverable, Text, View } from '@walless/gui';
import { Eye, EyeOff, Search, Settings } from '@walless/icons';
import { appState } from 'state/app';
import { useTokens } from 'utils/hooks';
import { useSnapshot } from 'valtio';

const Header = () => {
	const { config } = useSnapshot(appState);
	const { valuation } = useTokens();

	return (
		<View style={styles.container}>
			<View>
				<Text>Hi👋, your balance today:</Text>
				<View style={styles.tokenValuationContainer}>
					<Hoverable>
						{config.hideBalance ? (
							<Eye color="#19A3E1" size={16} />
						) : (
							<EyeOff color="#19A3E1" size={16} />
						)}
					</Hoverable>
					<Text style={styles.tokenValuation}>${valuation.toFixed(2)}</Text>
				</View>
			</View>

			<View style={styles.buttonContainer}>
				<Hoverable style={styles.button}>
					<Settings size={24} color="#566674" />
				</Hoverable>
				<Hoverable style={styles.button}>
					<Search size={24} color="#566674" />
				</Hoverable>
			</View>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 10,
	},
	tokenValuationContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	tokenValuation: {
		fontSize: 18,
		color: '#ffffff',
	},
	buttonContainer: {
		flexDirection: 'row',
		gap: 8,
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#23303C',
		borderRadius: 6,
		paddingHorizontal: 10,
	},
});
