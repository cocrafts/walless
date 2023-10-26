import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

const Introduction = () => {
	return (
		<View style={styles.container}>
			<View style={styles.introductionContainer}>
				<View style={styles.introductionLeftPart}>
					<Text style={styles.introductionText}>
						Walless is a humble startup, we’re looking for curious, enthusiastic
						developer who believe on the future of web3, and want to shape it
						your way.
					</Text>
				</View>
				<View style={styles.introductionRightPart}>
					<View style={styles.valueBlock}>
						<Text style={styles.valueTitle}>Our value</Text>
						<Text style={styles.valueContent}>
							Walless operate in the Tribe model, we care more about your
							personality than skills, we’ll become super-star together instead
							of take it for granted. Flat structure - everyone is peers, no
							layers, no boss, no decision making monopoly power. We want a
							builder with dare to explore mindset!
						</Text>
					</View>
					<View style={styles.valueBlock}>
						<Text style={styles.valueTitle}>Our value</Text>
						<Text style={styles.valueContent}>
							Walless operate in the Tribe model, we care more about your
							personality than skills, we’ll become super-star together instead
							of take it for granted. Flat structure - everyone is peers, no
							layers, no boss, no decision making monopoly power. We want a
							builder with dare to explore mindset!
						</Text>
					</View>
					<View style={styles.valueBlock}>
						<Text style={styles.valueTitle}>Our value</Text>
						<Text style={styles.valueContent}>
							Walless operate in the Tribe model, we care more about your
							personality than skills, we’ll become super-star together instead
							of take it for granted. Flat structure - everyone is peers, no
							layers, no boss, no decision making monopoly power. We want a
							builder with dare to explore mindset!
						</Text>
					</View>
				</View>
			</View>

			<View style={[styles.introductionContainer, styles.separateLine]}>
				<View style={styles.subpart}>
					<Text>Our team</Text>
				</View>
				<View style={styles.subpart}>
					<Text>9 members</Text>
					<Text>2023</Text>
				</View>
			</View>
		</View>
	);
};

export default Introduction;

const styles = StyleSheet.create({
	container: {
		gap: 28,
		paddingTop: 28,
	},
	introductionText: {
		color: '#ffffff',
		fontSize: 28,
		fontWeight: '500',
		lineHeight: 48,
	},
	introductionContainer: {
		flexDirection: 'row',
		gap: 60,
	},
	introductionLeftPart: {
		flex: 1,
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	introductionRightPart: {
		flex: 1,
		height: '100%',
		gap: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	valueBlock: {
		gap: 6,
	},
	valueTitle: {
		fontWeight: '600',
		color: '#798997',
		fontSize: 14,
	},
	valueContent: {
		color: '#566674',
		fontSize: 14,
		lineHeight: 24,
	},
	subpart: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	separateLine: {
		borderTopColor: '#ffffff',
		borderTopWidth: 1,
		width: '100%',
		paddingTop: 6,
	},
});
