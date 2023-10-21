import { ImageBackground, StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

import { members, recruitments } from './internal';
import MemberCard from './MemberCard';
import RecruitmentCard from './RecruitmentCard';

const AboutUsFeature = () => {
	return (
		<View style={styles.container}>
			<ImageBackground
				source={{ uri: '' }}
				resizeMode="cover"
				style={styles.heroSection}
			>
				<Text style={styles.title}>Our Team</Text>
			</ImageBackground>
			<View style={styles.introductionContainer}>
				<View style={styles.introductionLeftPart}>
					<View style={styles.introductionTextContainer}>
						<Text style={styles.introductionText}>
							Walless is a humble startup, we’re looking for curious,
							enthusiastic developer who believe on the future of web3, and want
							to shape it your way.
						</Text>
					</View>

					<Text>Our team</Text>
				</View>
				<View style={styles.introductionRightPart}>
					<View style={styles.valueContainer}>
						<View style={styles.valueBlock}>
							<Text style={styles.valueTitle}>Our value</Text>
							<Text style={styles.valueContent}>
								Walless operate in the Tribe model, we care more about your
								personality than skills, we’ll become super-star together
								instead of take it for granted. Flat structure - everyone is
								peers, no layers, no boss, no decision making monopoly power. We
								want a builder with dare to explore mindset!
							</Text>
						</View>
						<View style={styles.valueBlock}>
							<Text style={styles.valueTitle}>Our value</Text>
							<Text style={styles.valueContent}>
								Walless operate in the Tribe model, we care more about your
								personality than skills, we’ll become super-star together
								instead of take it for granted. Flat structure - everyone is
								peers, no layers, no boss, no decision making monopoly power. We
								want a builder with dare to explore mindset!
							</Text>
						</View>
						<View style={styles.valueBlock}>
							<Text style={styles.valueTitle}>Our value</Text>
							<Text style={styles.valueContent}>
								Walless operate in the Tribe model, we care more about your
								personality than skills, we’ll become super-star together
								instead of take it for granted. Flat structure - everyone is
								peers, no layers, no boss, no decision making monopoly power. We
								want a builder with dare to explore mindset!
							</Text>
						</View>
					</View>
					<View style={styles.subpart}>
						<Text>8 members</Text>
						<Text>2023</Text>
					</View>
				</View>
				<View style={styles.separateLine} />
			</View>
			<View style={styles.membersContainer}>
				{members.map((item, idx) => (
					<MemberCard key={idx} {...item} />
				))}
			</View>
			<View style={styles.recruitmentContainer}>
				<View>
					<Text style={styles.recruitmentTitle}>About</Text>
					<Text style={styles.recruitmentTitle}>Open recruitment</Text>
				</View>
				<View style={styles.recruitmentContentContainer}>
					{recruitments.map((item, idx) => (
						<RecruitmentCard key={idx} {...item} />
					))}
				</View>
			</View>
		</View>
	);
};

export default AboutUsFeature;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		gap: 40,
	},
	heroSection: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: 205,
		borderRadius: 30,
		backgroundColor: '#19A3E1',
	},
	title: {
		fontSize: 60,
		fontWeight: '500',
		color: '#ffffff',
	},
	introductionTextContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: 500,
	},
	introductionText: {
		color: '#ffffff',
		fontSize: 40,
		fontWeight: '500',
		lineHeight: 60,
	},
	introductionContainer: {
		flexDirection: 'row',
		gap: 40,
	},
	introductionLeftPart: {
		flex: 1,
		height: '100%',
	},
	introductionRightPart: {
		flex: 1,
		height: '100%',
	},
	valueContainer: {
		gap: 20,
		minHeight: 500,
		alignItems: 'center',
		justifyContent: 'center',
	},
	valueBlock: {
		gap: 6,
	},
	valueTitle: {
		fontWeight: '600',
		color: '#798997',
		fontSize: 16,
	},
	valueContent: {
		color: '#566674',
		fontSize: 16,
		lineHeight: 24,
	},
	subpart: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	separateLine: {
		position: 'absolute',
		width: '100%',
		height: 1,
		backgroundColor: '#ffffff',
		top: 492,
	},
	membersContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
	},
	recruitmentContainer: {
		flexDirection: 'row',
		gap: 80,
		backgroundColor: '#0694D3',
		paddingHorizontal: 80,
		paddingTop: 60,
		paddingBottom: 80,
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
	},
	recruitmentContentContainer: {
		flex: 1,
		gap: 20,
	},
	recruitmentTitle: {
		color: '#ffffff',
		fontSize: 32,
		fontWeight: '500',
	},
});
