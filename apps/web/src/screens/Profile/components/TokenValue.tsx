import { StyleSheet, View } from 'react-native';
import { Hoverable, Text } from '@walless/gui';
import { Eye, EyeOff } from '@walless/icons';
import { useSettings } from 'utils/hooks';

const TokenValue = () => {
	const { setting, setPrivacy } = useSettings();
	const balanceTextStyle = [
		styles.balanceText,
		setting.hideBalance && styles.protectedBalance,
	];

	const handleToggleTokenValue = async () => {
		setPrivacy(!setting.hideBalance);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.headingText}>Token value</Text>
			<View style={styles.balanceContainer}>
				<Text style={balanceTextStyle}>
					{setting.hideBalance ? '****' : '$0,00'}
				</Text>
				<Hoverable onPress={handleToggleTokenValue}>
					{setting.hideBalance ? (
						<Eye size={20} color="#566674" />
					) : (
						<EyeOff size={20} color="#566674" />
					)}
				</Hoverable>
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
		minHeight: 48,
	},
	balanceText: {
		color: '#FFFFFF',
		fontSize: 40,
		fontWeight: '500',
		lineHeight: 26,
	},
	protectedBalance: {
		paddingTop: 16,
	},
});
