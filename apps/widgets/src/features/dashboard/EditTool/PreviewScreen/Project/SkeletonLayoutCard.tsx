import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';

import SkeletonRect from './SkeletonRect';

const SkeletonLayoutCard: FC = () => {
	return (
		<View style={styles.container}>
			<View style={styles.banner} />
			<View style={styles.content}>
				<View style={styles.avatar} />

				<View style={styles.title}>
					<SkeletonRect width={30} height={8} />
					<SkeletonRect width={8} height={8} />
				</View>

				<SkeletonRect height={8} />
				<SkeletonRect height={8} />
				<SkeletonRect height={8} />
			</View>
		</View>
	);
};

export default SkeletonLayoutCard;

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderRadius: 12,
		borderColor: '#364654',
		overflow: 'hidden',
	},
	banner: {
		height: 133,
		borderBottomWidth: 1,
		borderColor: '#364654',
		backgroundColor: '#141C25',
	},
	content: {
		marginTop: -26,
		marginBottom: 16,
		padding: 10,
		gap: 8,
	},
	avatar: {
		width: 32,
		height: 32,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: '#364654',
		backgroundColor: 'rgb(10, 14, 19)',
	},
	title: {
		flexDirection: 'row',
		gap: 4,
	},
});
