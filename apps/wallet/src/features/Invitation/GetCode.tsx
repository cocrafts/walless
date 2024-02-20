import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Anchor, View } from '@walless/gui';

interface Props {
	onLoginPress?: () => void;
}

const HadWalletAccount: FC<Props> = ({ onLoginPress }) => {
	return (
		<View style={styles.container}>
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
