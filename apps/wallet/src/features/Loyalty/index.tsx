import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { UserProgress } from '@walless/graphql';
import { queries } from '@walless/graphql';
import type { TabAble } from '@walless/gui';
import { activatedStyle, deactivatedStyle, SliderTabs } from '@walless/gui';
import { loyaltyActions, loyaltyState } from 'state/loyalty';
import { qlClient } from 'utils/graphql';
import { useSafeAreaInsets, useSnapshot } from 'utils/hooks';

import AchievementsTab from './AchievementsTab';
import Header from './Header';
import LeaderboardTab from './LeaderboardTab';

enum Tab {
	Achievements = 'Achievements',
	Leaderboard = 'Leaderboard',
}

const tabs: TabAble[] = [
	{
		id: Tab.Achievements,
		title: 'Achievements',
	},
	{
		id: Tab.Leaderboard,
		title: 'Leaderboard',
	},
];

const LoyaltyFeature = () => {
	const [activeTab, setActiveTab] = useState(tabs[0]);
	const { userProgress } = useSnapshot(loyaltyState);
	const { bottom } = useSafeAreaInsets();

	useEffect(() => {
		const fetchLoyaltyProgress = async () => {
			const { loyaltyUserProgress } = await qlClient.request<{
				loyaltyUserProgress: UserProgress;
			}>(queries.loyaltyUserProgress);

			return loyaltyUserProgress;
		};

		fetchLoyaltyProgress()
			.then((progress) => loyaltyActions.setUserProgress(progress))
			.catch(console.error);
	}, []);

	return (
		<View style={styles.container}>
			<Header
				style={styles.pointCard}
				completedTask={userProgress?.actionRecords?.length ?? 0}
				point={userProgress?.totalPoints ?? 0}
			/>

			<View
				style={[
					styles.bottomContainer,
					{ paddingBottom: Math.max(bottom, 16) },
				]}
			>
				<SliderTabs
					items={tabs}
					activeItem={activeTab}
					activatedStyle={activatedStyle}
					deactivatedStyle={deactivatedStyle}
					onTabPress={setActiveTab}
				/>

				{activeTab.id === Tab.Achievements ? (
					<AchievementsTab userProgress={userProgress as UserProgress} />
				) : (
					<LeaderboardTab />
				)}
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
		gap: 12,
	},
});

export default LoyaltyFeature;
