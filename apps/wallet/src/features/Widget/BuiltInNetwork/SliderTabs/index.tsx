import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';

import TabItem from './Item';
import type { TabAble } from './shared';

interface Props {
	style?: ViewStyle;
	items: TabAble[];
	activeItem: TabAble;
	onTabPress?: (item: TabAble) => void;
}

export const SliderTabs: FC<Props> = ({
	style,
	items,
	activeItem,
	onTabPress,
}) => {
	return (
		<View style={[styles.container, style]}>
			{items.map((item) => {
				const isActive = item.id === activeItem.id;
				const backgroundColor = isActive ? '#0694D3' : 'transparent';
				const color = isActive ? 'white' : '#566674';
				const fontWeight = isActive ? '500' : '400';

				return (
					<TabItem
						key={item.id}
						item={item}
						backgroundColor={backgroundColor}
						color={color}
						fontWeight={fontWeight}
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
		backgroundColor: '#202d38',
		borderRadius: 10,
		padding: 4,
	},
});

export * from './shared';
