import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { TabAble } from '@walless/gui';
import { activatedStyle, deactivatedStyle, SliderTabs } from '@walless/gui';

import PointCard from './PointCard';

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
			<PointCard style={styles.pointCard} point={0} />

			<View style={styles.bottomContainer}>
				<SliderTabs
					items={tabs}
					activeItem={activeTab}
					activatedStyle={activatedStyle}
					deactivatedStyle={deactivatedStyle}
					onTabPress={setActiveTab}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: 24,
		gap: 16,
		flexGrow: 1,
	},
	pointCard: {
		marginHorizontal: 12,
	},
	bottomContainer: {
		backgroundColor: '#131C24',
		paddingVertical: 16,
		paddingHorizontal: 12,
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		flexGrow: 1,
	},
});

export default LoyaltyFeature;
