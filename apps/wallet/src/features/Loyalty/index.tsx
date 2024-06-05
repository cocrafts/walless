import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import type { Action, ActionMetadata, UserProgress } from '@walless/graphql';
import { queries } from '@walless/graphql';
import type { TabAble } from '@walless/gui';
import { activatedStyle, deactivatedStyle, SliderTabs } from '@walless/gui';
import { groupBy } from 'lodash';
import { loyaltyActions, loyaltyState } from 'state/loyalty';
import { qlClient } from 'utils/graphql';
import { useSafeAreaInsets, useSnapshot } from 'utils/hooks';

import Header from './Header';
import { extractDataFromMetadata } from './internal';
import PartnerTab from './PartnerTab';
import WallessTab from './WallessTab';

enum Tab {
	Walless = 'Walless',
	Partner = 'Partner',
}

const tabs: TabAble[] = [
	{
		id: Tab.Walless,
		title: 'Walless',
	},
	{
		id: Tab.Partner,
		title: 'Partner',
	},
];

const LoyaltyFeature = () => {
	const [isLoadingActions, setIsLoadingActions] = useState(true);
	const [activeTab, setActiveTab] = useState(tabs[0]);
	const { userProgress } = useSnapshot(loyaltyState);
	const { bottom } = useSafeAreaInsets();

	useEffect(() => {
		const fetchLoyaltyProgress = async () => {
			try {
				const { loyaltyUserProgress } = await qlClient.request<{
					loyaltyUserProgress: UserProgress;
				}>(queries.loyaltyUserProgress);

				loyaltyActions.setUserProgress(loyaltyUserProgress);
			} catch (err) {
				console.error(err);
			}
		};

		const fetchActiveActions = async () => {
			setIsLoadingActions(true);

			try {
				const { loyaltyActiveActions } = await qlClient.request<{
					loyaltyActiveActions: Action[];
				}>(queries.loyaltyActiveActions);

				const typeGroupedActions = groupBy(loyaltyActiveActions, 'type');

				const sortedActions = Object.values(typeGroupedActions)
					.map((actions) =>
						actions.sort((a, b) => (a.points || 0) - (b.points || 0)),
					)
					.flat();

				const wallessActions: Action[] = [];
				const partnerActionMap: Map<string, Action[]> = new Map();

				sortedActions.forEach((action) => {
					const extractedMetadata = extractDataFromMetadata(
						action.metadata as ActionMetadata[],
					);

					if (extractedMetadata.partner === '') {
						wallessActions.push(action);
					} else if (partnerActionMap.has(extractedMetadata.partner)) {
						partnerActionMap.get(extractedMetadata.partner)!.push(action);
					} else {
						partnerActionMap.set(extractedMetadata.partner, [action]);
					}
				});

				loyaltyActions.setWallessActions(wallessActions);
				loyaltyActions.setPartnerActionMap(partnerActionMap);
			} catch (err) {
				console.error(err);
			}

			setIsLoadingActions(false);
		};

		fetchLoyaltyProgress();
		fetchActiveActions();
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
				{isLoadingActions ? (
					<View style={styles.centerContainer}>
						<ActivityIndicator size="large" />
					</View>
				) : (
					<>
						<SliderTabs
							items={tabs}
							activeItem={activeTab}
							activatedStyle={activatedStyle}
							deactivatedStyle={deactivatedStyle}
							onTabPress={setActiveTab}
						/>

						{activeTab.id === Tab.Walless ? <WallessTab /> : <PartnerTab />}
					</>
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
	centerContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default LoyaltyFeature;
