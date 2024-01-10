import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import BaseQRCode from 'react-native-qrcode-svg';
import { View } from '@walless/gui';

interface Props {
	value: string;
	size?: number;
}

const QRCode: FC<Props> = ({ value, size }) => {
	return (
		<View style={styles.container}>
			<BaseQRCode value={value} size={size || 168} />
		</View>
	);
};

export default QRCode;

const styles = StyleSheet.create({
	container: {
		padding: 12,
		backgroundColor: '#FFFFFF',
		borderRadius: 8,
		alignSelf: 'center',
	},
});
