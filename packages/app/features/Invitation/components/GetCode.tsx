import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Anchor, Text, View } from '@walless/gui';

interface Props {
	onLoginPress?: () => void;
}

const GetCode: FC<Props> = ({ onLoginPress }) => {
	return (
		<View style={styles.container}>
			<View style={styles.separate}>
				<View style={styles.separateLine} />
				<Text style={styles.separateText}>If don&apos;t have code</Text>
				<View style={styles.separateLine} />
			</View>
			<Anchor
				title="Get invitation code"
				titleStyle={styles.invitationCodeText}
				href="https://docs.google.com/forms/d/e/1FAIpQLSeMOQGfeYhq4i-V595JRc28VlY1YDpFeU0rPJkTymFH6nV21g/viewform"
			/>
			<Anchor
				title="I already have Walless account"
				titleStyle={styles.hadAccountText}
				onPress={onLoginPress}
			/>
		</View>
	);
};

export default GetCode;

const styles = StyleSheet.create({
	container: {
		gap: 18,
	},
	separate: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	separateLine: {
		flex: 1,
		height: 1,
		backgroundColor: '#2A333C',
	},
	separateText: {
		color: '#566674',
	},
	invitationCodeText: {
		padding: 16,
		fontWeight: '500',
		textAlign: 'center',
		borderRadius: 16,
		color: '#ffffff',
		backgroundColor: '#000000',
	},
	hadAccountText: {
		color: '#0694D3',
		textAlign: 'center',
	},
});
