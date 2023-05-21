import { StyleSheet } from 'react-native';
import { Anchor, Text, View } from '@walless/gui';

const GetCode = () => {
	return (
		<View style={styles.container}>
			<View style={styles.separate}>
				<View style={styles.separateLine} />
				<Text style={styles.separateText}>If don&apos;t have code</Text>
				<View style={styles.separateLine} />
			</View>

			<Anchor
				style={styles.getCodeAnchor}
				titleStyle={styles.getCodeText}
				title="Get invitation code"
				href="https://docs.google.com/forms/d/e/1FAIpQLSeMOQGfeYhq4i-V595JRc28VlY1YDpFeU0rPJkTymFH6nV21g/viewform"
			/>
		</View>
	);
};

export default GetCode;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		gap: 16,
	},
	separate: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
	},
	separateLine: {
		width: 88,
		height: 1,
		backgroundColor: '#2A333C',
	},
	separateText: {
		fontSize: 14,
		color: '#566674',
		fontWeight: '400',
	},
	getCodeAnchor: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 336,
		height: 48,
		borderRadius: 16,
		backgroundColor: '#000000',
	},
	getCodeText: {
		fontSize: 16,
		fontWeight: '500',
		color: '#ffffff',
	},
});
