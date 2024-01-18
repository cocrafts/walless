import type { FC } from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import type { WalletInvitation } from '@walless/graphql';
import type { SlideOption } from '@walless/gui';
import { Slider, SliderTabs, View } from '@walless/gui';
import type {
	TabAble,
	TabItemStyle,
} from '@walless/gui/components/SliderTabs/TabItem';

import NewInvitationTab from './NewInvitationTab';
import UsedInvitationTab from './UsedInvitationTab';

interface Props {
	claimedReferrals: WalletInvitation[];
	unclaimedReferrals: WalletInvitation[];
}

const InviteFriendsTab: FC<Props> = ({
	claimedReferrals,
	unclaimedReferrals,
}) => {
	const [activeIndex, setActiveIndex] = useState(0);

	const tabItems: TabAble[] = [
		{ id: 'new', title: 'New' },
		{ id: 'used', title: 'Used' },
	];

	const sliderItems: SlideOption[] = [
		{
			id: 'new',
			component: () => (
				<NewInvitationTab unclaimedReferrals={unclaimedReferrals} />
			),
		},
		{
			id: 'used',
			component: () => (
				<UsedInvitationTab claimedReferrals={claimedReferrals} />
			),
		},
	];

	const activatedStyle: TabItemStyle = {
		containerStyle: {
			borderBottomColor: '#ffffff',
			borderRadius: 0,
			...styles.tabTextContainer,
		},
		textStyle: {
			color: '#ffffff',
			...styles.tabText,
		},
	};

	const deactivatedStyle: TabItemStyle = {
		containerStyle: {
			backgroundColor: 'transparent',
			...styles.tabTextContainer,
		},
		textStyle: {
			color: '#566674',
			...styles.tabText,
		},
	};

	const handleTabPress = (item: TabAble) => {
		const idx = tabItems.indexOf(item);
		setActiveIndex(idx);
	};

	return (
		<View style={styles.container}>
			<SliderTabs
				items={tabItems}
				activeItem={tabItems[activeIndex]}
				onTabPress={handleTabPress}
				activatedStyle={activatedStyle}
				deactivatedStyle={deactivatedStyle}
				style={styles.sliderTabContainer}
			/>

			<Slider
				style={styles.slider}
				items={sliderItems}
				activeItem={sliderItems[activeIndex]}
			/>
		</View>
	);
};

export default InviteFriendsTab;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 20,
	},
	sliderTabContainer: {
		alignSelf: 'center',
		gap: 20,
	},
	tabTextContainer: {
		borderBottomWidth: 1,
	},
	tabText: {
		fontWeight: '500',
		width: 52,
		alignSelf: 'center',
	},
	slider: {
		flex: 1,
		padding: 20,
	},
});
