import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { TabAble } from '@walless/gui';
import { activatedStyle, deactivatedStyle, SliderTabs } from '@walless/gui';
import { Star } from '@walless/icons';

import BackgroundPattern from './BackgroundPattern';

const tabs: TabAble[] = [
	{
		id: 'Achievements',
		title: 'Achievements',
	},
	{
		id: 'Leaderboard',
		title: 'Leaderboard',
	},
];

const LoyaltyFeature = () => {
	const [activeTab, setActiveTab] = useState(tabs[0]);

	return (
		<View style={styles.container}>
			<View style={styles.totalPointsContainer}>
				<View style={styles.totalPointsLeftContainer}>
					<View style={styles.starContainer}>
						<Star color="#44C5FF" size={12} />
					</View>

					<View style={styles.textContainer}>
						<Text style={styles.pointText}>2,500</Text>
						<Text style={styles.totalPointsText}>Total Points</Text>
					</View>
				</View>

				<BackgroundPattern />
			</View>

			<SliderTabs
				items={tabs}
				activeItem={activeTab}
				activatedStyle={activatedStyle}
				deactivatedStyle={deactivatedStyle}
				style={styles.tabHeaderContainer}
				onTabPress={setActiveTab}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 16,
		paddingHorizontal: 12,
	},
	totalPointsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#131C24',
		borderRadius: 15,
		overflow: 'hidden',
	},
	totalPointsLeftContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 24,
		paddingHorizontal: 16,
		gap: 12,
	},
	starContainer: {
		padding: 6,
		borderRadius: 100,
		borderColor: '#44C5FF4D',
		borderWidth: 1,
	},
	textContainer: {
		gap: 3,
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
	tabHeaderContainer: {
		marginTop: 16,
		marginBottom: 8,
	},
});

export default LoyaltyFeature;
