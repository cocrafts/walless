import { type FC, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { ReferralRankingRecord, WalletInvitation } from '@walless/graphql';
import { queries } from '@walless/graphql';
import type { SlideOption } from '@walless/gui';
import { Slider, SliderTabs, Text, View } from '@walless/gui';
import type {
	TabAble,
	TabItemStyle,
} from '@walless/gui/components/SliderTabs/TabItem';
import { qlClient } from 'utils/graphql';
import type { SettingParamList } from 'utils/navigation';

import DetailsContainer from './DetailsContainer';
import InviteFriendsTab from './InviteFriendsTab';
import LeaderboardTab from './Leaderboard';
import SuccessfulReferral from './SuccessfulReferral';

type Props = StackScreenProps<SettingParamList, 'Referral'>;

export const ReferralScreen: FC<Props> = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [claimedReferrals, setClaimedReferrals] = useState<WalletInvitation[]>(
		[],
	);
	const [unclaimedReferrals, setUnclaimedReferrals] = useState<
		WalletInvitation[]
	>([]);
	const [leaderboard, setLeaderboard] = useState<ReferralRankingRecord[]>([]);

	useEffect(() => {
		const fetchClaimedReferrals = async () => {
			const { claimedWalletInvitations } = await qlClient.request<{
				claimedWalletInvitations: WalletInvitation[];
			}>(queries.claimedInvitations);

			setClaimedReferrals(claimedWalletInvitations);
		};

		const fetchUnclaimedReferrals = async () => {
			const { unclaimedWalletInvitations } = await qlClient.request<{
				unclaimedWalletInvitations: WalletInvitation[];
			}>(queries.unclaimedInvitations);

			setUnclaimedReferrals(unclaimedWalletInvitations);
		};

		const fetchLeaderboard = async () => {
			const { referralLeaderboard } = await qlClient.request<{
				referralLeaderboard: ReferralRankingRecord[];
			}>(queries.referralLeaderboard);
			setLeaderboard(referralLeaderboard);
		};

		Promise.all([
			fetchClaimedReferrals(),
			fetchUnclaimedReferrals(),
			fetchLeaderboard(),
		]);
	}, []);

	const accountId = unclaimedReferrals?.[0]?.referrerId;

	const myRank = leaderboard.find((record) => record.id === accountId)?.rank;

	const currentLevelReferralCount = 3;

	const sliderItems: SlideOption[] = [
		{
			id: 'inviteFriends',
			component: () => (
				<InviteFriendsTab
					claimedReferrals={claimedReferrals.toReversed()}
					unclaimedReferrals={unclaimedReferrals}
				/>
			),
		},
		{
			id: 'leaderboard',
			component: () => (
				<LeaderboardTab accountId={accountId} leaderboard={leaderboard} />
			),
		},
	];

	const tabItems: TabAble[] = [
		{
			id: 'inviteFriends',
			title: 'Invite Friends',
		},
		{
			id: 'leaderboard',
			title: 'Leaderboard',
		},
	];

	const activatedStyle: TabItemStyle = {
		containerStyle: {
			borderBottomWidth: 1,
			borderBottomColor: '#ffffff',
			borderRadius: 0,
		},
		textStyle: {
			color: '#ffffff',
			fontWeight: '500',
		},
	};

	const deactivatedStyle: TabItemStyle = {
		containerStyle: {
			backgroundColor: 'transparent',
		},
		textStyle: {
			color: '#566674',
			fontWeight: '500',
		},
	};

	const handleTabPress = (item: TabAble) => {
		const idx = tabItems.indexOf(item);
		setActiveIndex(idx);
	};

	return (
		<View style={[styles.container]}>
			<Text style={styles.title}>Be an Influencer</Text>
			<Text style={styles.subtext}>
				Lorem ipsum dolor sit amet consectetur.
			</Text>

			<View style={styles.headerContainer}>
				<View style={styles.subpartContainer}>
					<DetailsContainer
						title="Rank"
						value={myRank ? `#${myRank}` : 'N/A'}
					/>

					<DetailsContainer title="Points from friends" value="coming soon" />
				</View>

				<SuccessfulReferral
					{...{
						numberOfActivatedReferrals: claimedReferrals.length,
						numberOfReferrals: currentLevelReferralCount,
					}}
				/>
			</View>

			<SliderTabs
				items={tabItems}
				activeItem={tabItems[activeIndex]}
				activatedStyle={activatedStyle}
				deactivatedStyle={deactivatedStyle}
				onTabPress={handleTabPress}
			/>

			<Slider
				style={styles.slider}
				items={sliderItems}
				activeItem={sliderItems[activeIndex]}
			/>
		</View>
	);
};

export default ReferralScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 14,
		paddingTop: 16,
		paddingBottom: 36,
		gap: 12,
	},
	title: {
		fontSize: 20,
		fontWeight: '700',
		color: '#ffffff',
		textAlign: 'center',
	},
	subtext: {
		color: '#ffffff',
		textAlign: 'center',
	},
	headerContainer: {
		gap: 12,
	},
	subpartContainer: {
		flexDirection: 'row',
		gap: 12,
	},
	slider: {
		flex: 1,
		padding: 20,
	},
});
