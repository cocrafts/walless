import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BlingBling, Check, Ranking } from '@walless/icons';
import { useSafeAreaInsets } from 'utils/hooks';

import { showHistory } from './History';

interface Props {
	point: number;
	completedTask: number;
	style?: ViewStyle;
}

const Header: FC<Props> = ({ point, completedTask, style }) => {
	const safeAreaInsets = useSafeAreaInsets();

	return (
		<View style={[styles.container, style]}>
			<View style={styles.yourTotalPointsContainer}>
				<Text style={styles.yourTotalPointsText}>Your total point</Text>
				<View style={styles.horizontalContainer}>
					<View style={styles.blingContainer}>
						<BlingBling size={12} />
					</View>
					<Text style={styles.pointText}>{point}</Text>
				</View>
			</View>

			<View style={styles.bottomContainer}>
				<TouchableOpacity
					style={styles.bottomItemContainer}
					onPress={() => showHistory({ safeAreaInsets })}
				>
					<View style={[styles.iconContainer, styles.checkBorder]}>
						<Check size={14} color="#2FC879" />
					</View>
					<View>
						<Text style={styles.subText}>Completed Task</Text>
						<Text style={styles.mainText}>{completedTask}</Text>
					</View>
				</TouchableOpacity>

				<View style={styles.bottomItemContainer}>
					<View style={[styles.iconContainer, styles.rankingBorder]}>
						<Ranking size={14} color="#F6D570" />
					</View>
					<View style={{ paddingRight: 12 }}>
						<Text style={styles.subText}>Ranking</Text>
						<Text style={styles.mainText}>Incoming</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 16,
		overflow: 'hidden',
		paddingVertical: 18,
		gap: 10,
		backgroundColor: '#131C24',
	},
	yourTotalPointsContainer: {
		gap: 4,
		alignItems: 'center',
	},
	yourTotalPointsText: {
		color: '#CFCFCF',
		fontSize: 12,
	},
	horizontalContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	blingContainer: {
		backgroundColor: '#212F3C',
		alignItems: 'center',
		justifyContent: 'center',
		width: 24,
		height: 24,
		borderRadius: 12,
	},
	pointText: {
		fontSize: 30,
		fontWeight: 'bold',
		color: 'white',
	},
	totalPointsText: {
		fontSize: 14,
		fontWeight: '200',
		color: 'white',
	},
	bottomContainer: {
		flexDirection: 'row',
		gap: 8,
		alignItems: 'center',
	},
	bottomItemContainer: {
		flexDirection: 'row',
		gap: 8,
		alignItems: 'center',
		backgroundColor: '#19232C',
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 16,
	},
	iconContainer: {
		width: 26,
		height: 26,
		borderRadius: 13,
		justifyContent: 'center',
		alignItems: 'center',
	},
	checkBorder: {
		borderWidth: 1,
		borderColor: 'rgba(47, 200, 121, 0.3)',
	},
	rankingBorder: {
		borderWidth: 1,
		borderColor: 'rgba(246, 213, 112, 0.3)',
	},
	subText: {
		fontSize: 10,
		color: '#798997',
	},
	mainText: {
		fontSize: 14,
		color: 'white',
	},
});

export default Header;
