import { StyleSheet } from 'react-native';
import { Anchor, Text, View } from '@walless/gui';

const BottomPart = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.copyrightText}>
				{process.env.EXTENSION_VERSION &&
					`Version ${process.env.EXTENSION_VERSION}, `}
				Copyright @ 2023. All rights reserved.
			</Text>
			<View style={styles.anchorContainer}>
				<Anchor
					titleStyle={styles.anchorStyle}
					title="Terms & Conditions"
					href="/"
				/>
				<Anchor
					titleStyle={styles.anchorStyle}
					title="Privacy Policy"
					href="https://walless.io/privacy-policy"
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	anchorContainer: {
		flexDirection: 'row',
		gap: 40,
	},
	copyrightText: {
		color: '#566674',
	},
	anchorStyle: {
		color: '#fff',
		fontSize: 14,
	},
});

export default BottomPart;
