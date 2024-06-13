import { StyleSheet, Text } from 'react-native';
import { Hoverable, View } from '@walless/gui';
import { Eye, EyeOff, Settings } from '@walless/icons';
import { appState } from 'state/app';
import { setPrivacy } from 'state/runtime/config';
import { getValuationDisplay } from 'utils/helper';
import { useTokens } from 'utils/hooks';
import { navigate } from 'utils/navigation';
import { useSnapshot } from 'valtio';

const Header = () => {
	const { config } = useSnapshot(appState);
	const { valuation } = useTokens();

	const handleNavigateToSettings = () => {
		navigate('Dashboard', {
			screen: 'Explore',
			params: { screen: 'Profile', params: { screen: 'Setting' } },
		});
	};

	return (
		<View style={styles.container}>
			<View style={styles.balanceContainer}>
				<Text style={styles.helloText}>Hi 👋, your balance today:</Text>
				<View style={styles.tokenValuationContainer}>
					<Hoverable
						style={!config.hideBalance && styles.eyeOffIcon}
						onPress={() => {
							setPrivacy(!config.hideBalance);
						}}
					>
						{config.hideBalance ? (
							<Eye color="#19A3E1" size={16} />
						) : (
							<EyeOff color="#19A3E1" size={16} />
						)}
					</Hoverable>
					<Text
						style={[
							styles.tokenValuation,
							config.hideBalance && styles.hiddenTokenValuation,
						]}
					>
						{getValuationDisplay(valuation, config.hideBalance)}
					</Text>
				</View>
			</View>

			<View style={styles.buttonContainer}>
				<Hoverable onPress={handleNavigateToSettings} style={styles.button}>
					<Settings size={20} color="#566674" />
				</Hoverable>

				{/* This button will be implemented in the next task, so I keep it here
				for now in the comment */}
				{/* <Hoverable style={styles.button}>
					<Search size={20} color="#566674" />
				</Hoverable> */}
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
		paddingHorizontal: 16,
	},
	helloText: {
		color: '#ffffff',
	},
	balanceContainer: {
		gap: 4,
	},
	eyeOffIcon: {
		top: 1,
	},
	tokenValuationContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	hiddenTokenValuation: {
		lineHeight: 21.5,
		fontSize: 12,
	},
	tokenValuation: {
		fontSize: 18,
		color: '#ffffff',
	},
	buttonContainer: {
		flexDirection: 'row',
		alignSelf: 'flex-end',
		gap: 8,
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#23303C',
		borderRadius: 6,
		padding: 8,
	},
});
