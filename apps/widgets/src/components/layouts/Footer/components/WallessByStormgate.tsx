import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import Image from 'next/image';

const WallessByStormgate = () => {
	return (
		<View style={styles.container}>
			<Image
				src="/img/vertical-logo.svg"
				alt="Walless Logo"
				width={169}
				height={124}
			/>

			<Text style={styles.text}>Built by Stormgate.io 💙</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 20,
		alignItems: 'center',
	},
	text: {
		color: '#566674',
		textAlign: 'center',
	},
});

export default WallessByStormgate;
