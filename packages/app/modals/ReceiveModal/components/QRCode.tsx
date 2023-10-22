import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { View } from '@walless/gui';

interface Props {
	value: string;
}

const QRCodeSVG: FC<Props> = ({ value }) => {
	return (
		<View style={styles.container}>
			<QRCode value={value} size={168} />
		</View>
	);
};

export default QRCodeSVG;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 194,
		height: 194,
		backgroundColor: '#FFFFFF',
		borderRadius: 8,
	},
});
