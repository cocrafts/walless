import type { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Hoverable, Text, View } from '@walless/gui';

type Props = {
	name: string;
	symbol: string;
	logoURI: string;
	onPress?: () => void;
};

const ToToken: FC<Props> = ({ name, symbol, logoURI, onPress }) => {
	return (
		<Hoverable style={styles.container} onPress={onPress}>
			<Image style={styles.icon} source={{ uri: logoURI }} />
			<View style={styles.infoContainer}>
				<Text style={styles.name}>{name}</Text>
				<Text style={styles.symbol}>{symbol}</Text>
			</View>
		</Hoverable>
	);
};

export default ToToken;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingVertical: 12,
		alignItems: 'center',
		gap: 14,
	},
	infoContainer: {
		gap: 4,
	},
	icon: {
		height: 40,
		width: 40,
		borderRadius: 20,
	},
	name: {
		color: '#FFFFFF',
		fontWeight: '500',
	},
	symbol: {
		color: '#566674',
	},
});
