import { useState } from 'react';
import { StyleSheet } from 'react-native';
import type { SlideOption } from '@walless/gui';
import { Slider, SliderTabs, View } from '@walless/gui';
import type {
	TabAble,
	TabItemStyle,
} from '@walless/gui/components/SliderTabs/TabItem';

import NewInvitationTab from './NewInvitationTab';
import UsedInvitationTab from './UsedInvitationTab';

const InviteFriendsTab = () => {
	const [activeIndex, setActiveIndex] = useState(0);

	const tabItems: TabAble[] = [
		{ id: 'new', title: 'New' },
		{ id: 'used', title: 'Used' },
	];

	const sliderItems: SlideOption[] = [
		{
			id: 'new',
			component: () => <NewInvitationTab />,
		},
		{
			id: 'used',
			component: () => <UsedInvitationTab />,
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
			borderBottomWidth: 1,
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
		<View style={styles.container}>
			<SliderTabs
				items={tabItems}
				activeItem={tabItems[activeIndex]}
				onTabPress={handleTabPress}
				activatedStyle={activatedStyle}
				deactivatedStyle={deactivatedStyle}
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
	},
	slider: {
		flex: 1,
	},
});
