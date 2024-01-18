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
			...styles.tabText,
		},
	};

	const deactivatedStyle: TabItemStyle = {
		containerStyle: {
			borderBottomWidth: 1,
			backgroundColor: 'transparent',
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
				style={{
					width: 'fit-content',
					alignSelf: 'center',
					gap: 20,
				}}
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
	slider: {
		flex: 1,
		padding: 20,
	},
	tabText: {
		fontWeight: '500',
		width: 52,
	},
});
