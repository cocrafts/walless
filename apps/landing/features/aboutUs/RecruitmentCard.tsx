import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import Link from 'next/link';

export interface RecruitmentCardProps {
	title: string;
	description: string[];
	applyUrl: string;
}

const RecruitmentCard: FC<RecruitmentCardProps> = ({
	title,
	description,
	applyUrl,
}) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<View style={styles.contentContainer}>
				{description.map((item, idx) => (
					<View key={idx} style={styles.descriptionContainer}>
						<View style={styles.bulletList} />
						<Text numberOfLines={1} style={styles.description}>
							{item}
						</Text>
					</View>
				))}
				<Link href={applyUrl} target="_blank" style={styles.applyUrlContainer}>
					<Text style={styles.applyUrl}>Apply</Text>
				</Link>
			</View>
		</View>
	);
};

export default RecruitmentCard;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		padding: 36,
		gap: 20,
		backgroundColor: '#131C24',
		borderRadius: 20,
	},
	title: {
		color: '#ffffff',
		fontSize: 32,
		width: '35%',
		maxWidth: 400,
	},
	contentContainer: {
		flex: 1,
	},
	description: {
		color: '#ffffff',
	},
	descriptionContainer: {
		flexDirection: 'row',
		gap: 4,
		alignItems: 'center',
	},
	bulletList: {
		backgroundColor: '#ffffff',
		width: 4,
		height: 4,
		borderRadius: 2,
	},
	applyUrlContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#0694D3',
		maxWidth: 120,
		paddingLeft: 40,
		paddingRight: 40,
		paddingTop: 8,
		paddingBottom: 8,
		borderRadius: 16,
		marginTop: 30,
	},
	applyUrl: {
		color: '#ffffff',
		fontSize: 16,
	},
});
