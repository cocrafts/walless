import { type FC, useState } from 'react';
import { StyleSheet } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { SlideOption } from '@walless/gui';
import { Slider, SliderTabs, Text, View } from '@walless/gui';
import type {
	TabAble,
	TabItemStyle,
} from '@walless/gui/components/SliderTabs/TabItem';
import type { SettingParamList } from 'utils/navigation';

import DetailsContainer from './DetailsContainer';
import InviteFriendsTab from './InviteFriendsTab';
import LeaderboardTab from './Leaderboard';
import SuccessfulReferral from './SuccessfulReferral';

type Props = StackScreenProps<SettingParamList, 'Referral'>;

export const ReferralScreen: FC<Props> = () => {
	const [activeIndex, setActiveIndex] = useState(0);

	const numberOfReferrals = 8;
	const numberOfActivatedReferrals = 5;

	const sliderItems: SlideOption[] = [
		{
			id: 'inviteFriends',
			component: () => <InviteFriendsTab />,
		},
		{
			id: 'leaderboard',
			component: () => <LeaderboardTab />,
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
					<DetailsContainer title="Rank" value="#439" />

					<DetailsContainer title="Points from friends" value="coming soon" />
				</View>

				<SuccessfulReferral
					{...{ numberOfActivatedReferrals, numberOfReferrals }}
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
		paddingHorizontal: 20,
		marginVertical: 10,
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
