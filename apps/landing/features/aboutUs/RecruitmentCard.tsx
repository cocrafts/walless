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
				<View>
					{description.map((item, idx) => (
						<View key={idx} style={styles.descriptionContainer}>
							<View style={styles.bulletList} />
							<Text numberOfLines={1} style={styles.description}>
								{item}
							</Text>
						</View>
					))}
				</View>
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
		padding: 48,
		gap: 30,
		backgroundColor: '#131C24',
		borderRadius: 20,
	},
	title: {
		color: '#ffffff',
		fontSize: 40,
		width: '40%',
		maxWidth: 400,
	},
	contentContainer: {
		flex: 1,
		gap: 30,
	},
	description: {
		color: '#ffffff',
		fontSize: 16,
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
		height: 48,
		maxWidth: 120,
		paddingHorizontal: 36,
		paddingVertical: 16,
		borderRadius: 16,
	},
	applyUrl: {
		color: '#ffffff',
		fontSize: 18,
	},
});
