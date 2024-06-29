import { StyleSheet, Text, View } from 'react-native';
import { Anchor } from '@walless/gui';

import GetCodeStepCard from './GetCodeStepCard';
import GetCodeStepNumber from './GetCodeStepNumber';

const InvitationGuide = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Get invitation code</Text>

			<Text style={styles.subtitle}>
				Walless is in phase 2. To get access code:
			</Text>

			<View style={styles.contentContainer}>
				<View style={styles.stepCardContainer}>
					<GetCodeStepCard text="Go to Walless Discord" />
					<GetCodeStepCard text="Go to channel “referral-codes”" />
					<GetCodeStepCard text="Use code from other users or ping admin for access code" />
				</View>

				<View style={styles.stepNumberContainer}>
					<GetCodeStepNumber number={1} />
					<View style={styles.connectedLine} />
					<GetCodeStepNumber number={2} />
					<View style={styles.connectedLine} />
					<GetCodeStepNumber number={3} />
				</View>
			</View>

			<Anchor style={styles.anchor} href="https://discord.gg/kCBUHFZVVY">
				<Text style={styles.anchorText}>Go to Discord</Text>
			</Anchor>
		</View>
	);
};

export default InvitationGuide;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 28,
		paddingHorizontal: 28,
		gap: 20,
		backgroundColor: '#232F37',
		borderRadius: 16,
		alignSelf: 'center',
	},
	title: {
		color: '#ffffff',
		fontSize: 24,
		fontWeight: '500',
	},
	subtitle: {
		color: '#ffffff',
	},
	contentContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	stepCardContainer: {
		gap: 16,
	},
	stepNumberContainer: {
		alignItems: 'center',
	},
	connectedLine: {
		width: 2,
		height: 58,
		backgroundColor: '#ffffff66',
	},
	anchor: {
		backgroundColor: '#198CCA',
		borderColor: '#19A3E1',
		shadowColor: '#16B7FF',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.0,
		elevation: 24,
		borderRadius: 10,
		borderWidth: 1,
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
	anchorText: {
		color: '#ffffff',
		fontWeight: '500',
	},
});
