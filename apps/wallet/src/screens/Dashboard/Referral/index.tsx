import { type FC, useState } from 'react';
import { StyleSheet, type ViewStyle } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { SlideOption } from '@walless/gui';
import { Slider, SliderTabs, Text, View } from '@walless/gui';
import type {
	TabAble,
	TabItemStyle,
} from '@walless/gui/components/SliderTabs/TabItem';
import { tabBarHeight } from 'utils/constants';
import { useSafeAreaInsets } from 'utils/hooks';
import type { SettingParamList } from 'utils/navigation';

import InviteFriendsTab from './InviteFriendsTab';
import LeaderboardTab from './Leaderboard';

type Props = StackScreenProps<SettingParamList, 'Referral'>;

export const ReferralScreen: FC<Props> = () => {
	const insets = useSafeAreaInsets();
	const containerStyle: ViewStyle = {
		paddingBottom: tabBarHeight + insets.bottom,
		paddingHorizontal: 8,
	};

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
		<View style={[containerStyle, styles.container]}>
			<Text style={styles.title}>Be an Influencer</Text>
			<Text>Lorem ipsum dolor sit amet consectetur.</Text>

			<View style={styles.subpartContainer}>
				<View style={styles.subpart}>
					<Text style={[styles.subpartText, styles.subpartTitle]}>Rank</Text>
					<Text style={[styles.subpartText]}>#439</Text>
				</View>

				<View style={styles.subpart}>
					<Text style={[styles.subpartText, styles.subpartTitle]}>
						Points earned from friends
					</Text>
					<Text style={[styles.subpartText]}>coming soon</Text>
				</View>
			</View>

			<View style={styles.successfulReferralContainer}>
				<Text style={[styles.subpartText, styles.subpartTitle]}>
					Successful referral
				</Text>
				<View style={styles.rateContainer}>
					<View style={styles.rate}>
						{Array.from({ length: numberOfReferrals }).map((_, index) => {
							const isActivated = index < numberOfActivatedReferrals;
							return (
								<View
									key={index}
									style={isActivated ? styles.activeRate : styles.rate}
								/>
							);
						})}

						<Text style={[styles.rateText]}>
							{numberOfActivatedReferrals}/{numberOfReferrals}
						</Text>
					</View>
					<Text style={styles.subpartText}>Level 1</Text>
				</View>
			</View>

			<View style={styles.sliderContainer}>
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
		</View>
	);
};

export default ReferralScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: '700',
		color: '#ffffff',
	},
	subpartContainer: {
		flex: 1,
		flexDirection: 'row',
		gap: 12,
	},
	subpart: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#566674',
		paddingHorizontal: 12,
		paddingVertical: 16,
	},
	subpartText: {
		color: '#ffffff',
	},
	subpartTitle: {
		flex: 1,
		fontSize: 16,
		fontWeight: '500',
	},
	successfulReferralContainer: {
		backgroundColor: '#566674',
		gap: 12,
		paddingHorizontal: 12,
		paddingVertical: 16,
	},
	rateContainer: {
		flexDirection: 'row',
		gap: 12,
		justifyContent: 'space-between',
	},
	rate: {
		flex: 1,
		flexDirection: 'row',
		height: 20,
		borderRadius: 10,
		backgroundColor: '#ffffff',
		overflow: 'hidden',
	},
	activeRate: {
		flex: 1,
		backgroundColor: '#0694D3',
		height: 20,
	},
	rateText: {
		top: 3,
		left: '50%',
		position: 'absolute',
		color: '#000000',
	},
	sliderContainer: {
		flex: 1,
	},
	slider: {
		minHeight: '100%',
	},
});
