import type { FC } from 'react';
import { StyleSheet, type ViewStyle } from 'react-native';

import View from '../View';

import type { TabAble, TabItemStyle } from './TabItem';
import TabItem from './TabItem';

interface SliderTabsProps {
	style?: ViewStyle;
	activatedStyle: TabItemStyle;
	deactivatedStyle: TabItemStyle;
	items: TabAble[];
	activeItem: TabAble;
	onTabPress?: (item: TabAble) => void;
}

export const SliderTabs: FC<SliderTabsProps> = ({
	style,
	activatedStyle,
	deactivatedStyle,
	items,
	activeItem,
	onTabPress,
}) => {
	return (
		<View style={[styles.container, style]}>
			{items.map((item) => {
				const isActive = item.id === activeItem.id;
				const containerStyle = isActive
					? activatedStyle.containerStyle
					: deactivatedStyle.containerStyle;

				const textStyle = isActive
					? activatedStyle.textStyle
					: deactivatedStyle.textStyle;

				const style = { containerStyle, textStyle };

				return (
					<TabItem
						key={item.id}
						item={item}
						style={style}
						onPress={onTabPress}
					/>
				);
			})}
		</View>
	);
};

export default SliderTabs;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		borderRadius: 10,
		padding: 4,
	},
});
