import { ImageBackground, StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

import { members, recruitments } from './internal';
import Introduction from './Introduction';
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
			<Introduction />
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
		marginTop: 40,
	},
	title: {
		fontSize: 60,
		fontWeight: '500',
		color: '#ffffff',
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
