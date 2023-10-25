import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { View } from '@walless/gui';

interface Props {
	value: string;
	size?: number;
}

const QRCodeSVG: FC<Props> = ({ value, size }) => {
	return (
		<View style={styles.container}>
			<QRCode value={value} size={size || 168} />
		</View>
	);
};

export default QRCodeSVG;

const styles = StyleSheet.create({
	container: {
		padding: 12,
		backgroundColor: '#FFFFFF',
		borderRadius: 8,
		alignSelf: 'center',
	},
});
