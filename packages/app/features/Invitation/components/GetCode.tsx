import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Anchor, View } from '@walless/gui';

interface Props {
	onLoginPress?: () => void;
}

const HadWalletAccount: FC<Props> = ({ onLoginPress }) => {
	return (
		<View style={styles.container}>
			<View style={styles.separateLine} />
			<Anchor
				style={styles.hadAccountContainer}
				titleStyle={styles.hadAccountText}
				title="I already have Walless account"
				onPress={onLoginPress}
			/>
		</View>
	);
};

export default HadWalletAccount;

const styles = StyleSheet.create({
	container: {
		gap: 18,
	},
	separateLine: {
		height: 1,
		backgroundColor: '#2A333C',
	},
	separateText: {
		color: '#566674',
	},
	hadAccountContainer: {
		borderRadius: 16,
		backgroundColor: '#000000',
	},
	hadAccountText: {
		padding: 16,
		fontWeight: '500',
		textAlign: 'center',
		color: '#ffffff',
	},
});
