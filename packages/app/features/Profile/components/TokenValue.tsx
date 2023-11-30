import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Hoverable, Text } from '@walless/gui';
import { Eye, EyeOff } from '@walless/icons';

import { useSettings } from '../../../utils/hooks';

interface Props {
	value: number;
}

const TokenValue: FC<Props> = ({ value }) => {
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
		minHeight: 84,
	},
	balanceText: {
		color: '#FFFFFF',
		fontSize: 40,
		fontWeight: '500',
	},
	protectedBalance: {
		paddingTop: 16,
	},
});
